function ScoreKeeper() {
    try {
        const formats = {
            headToHead: {
                label: 'One v One',
                description: 'Count games won. First to the target wins the match.',
                playerCount: 2,
                target: 5,
                unit: 'games'
            },
            domino: {
                label: 'Domino / Points',
                description: 'A flexible points board for your Domino-style games.',
                playerCount: 2,
                target: 21,
                unit: 'points'
            },
            group: {
                label: 'Group League',
                description: 'Award 4, 3, 2 and 1 points for each game’s finishing order.',
                playerCount: 4,
                target: null,
                unit: 'league points'
            },
            darts: {
                label: 'Darts Scoring',
                description: 'Win three legs by two clear to take a set.',
                playerCount: 2,
                target: 3,
                unit: 'sets'
            },
            knockout: {
                label: 'Knockout',
                description: 'Track the current tie; one match win sends a player through.',
                playerCount: 2,
                target: 1,
                unit: 'match wins'
            },
            cup: {
                label: 'Switch Cup',
                description: 'Use for each cup tie, then rename the players for the next draw.',
                playerCount: 2,
                target: 2,
                unit: 'games'
            }
        };

        const makeState = (formatKey) => {
            const format = formats[formatKey];
            return {
                formatKey,
                players: Array.from({ length: format.playerCount }, (_, index) => ({
                    name: `Player ${index + 1}`,
                    score: 0,
                    legs: 0
                })),
                target: format.target,
                history: []
            };
        };

        const loadInitialState = () => {
            try {
                const saved = localStorage.getItem('switchScoreKeeper');
                if (saved) {
                    const parsed = JSON.parse(saved);
                    if (parsed && formats[parsed.formatKey] && Array.isArray(parsed.players)) {
                        return parsed;
                    }
                }
            } catch (error) {
                console.warn('Could not restore scorekeeper:', error);
            }
            return makeState('headToHead');
        };

        const [state, setState] = React.useState(loadInitialState);
        const format = formats[state.formatKey];

        React.useEffect(() => {
            localStorage.setItem('switchScoreKeeper', JSON.stringify(state));
        }, [state]);

        const snapshot = (current) => ({
            players: current.players.map((player) => ({ ...player })),
            target: current.target
        });

        const changeFormat = (formatKey) => {
            setState(makeState(formatKey));
        };

        const changeName = (playerIndex, name) => {
            setState((current) => ({
                ...current,
                players: current.players.map((player, index) =>
                    index === playerIndex ? { ...player, name } : player
                )
            }));
        };

        const changeScore = (playerIndex, amount) => {
            setState((current) => {
                const previous = snapshot(current);
                const players = current.players.map((player, index) =>
                    index === playerIndex
                        ? { ...player, score: Math.max(0, player.score + amount) }
                        : player
                );
                return { ...current, players, history: [...current.history, previous].slice(-30) };
            });
        };

        const recordDartsLeg = (playerIndex) => {
            setState((current) => {
                const previous = snapshot(current);
                const players = current.players.map((player) => ({ ...player }));
                players[playerIndex].legs += 1;

                const otherIndex = playerIndex === 0 ? 1 : 0;
                const hasWonSet = players[playerIndex].legs >= 3 &&
                    players[playerIndex].legs - players[otherIndex].legs >= 2;

                if (hasWonSet) {
                    players[playerIndex].score += 1;
                    players.forEach((player) => { player.legs = 0; });
                }

                return { ...current, players, history: [...current.history, previous].slice(-30) };
            });
        };

        const undo = () => {
            setState((current) => {
                if (!current.history.length) return current;
                const previous = current.history[current.history.length - 1];
                return {
                    ...current,
                    players: previous.players,
                    target: previous.target,
                    history: current.history.slice(0, -1)
                };
            });
        };

        const resetScores = () => {
            setState((current) => ({
                ...current,
                players: current.players.map((player) => ({ ...player, score: 0, legs: 0 })),
                history: []
            }));
        };

        const winner = state.target
            ? state.players.find((player) => player.score >= state.target)
            : null;

        const scoreButtons = state.formatKey === 'group'
            ? [4, 3, 2, 1]
            : state.formatKey === 'domino'
                ? [1, 5, 10]
                : [1];

        return (
            <div data-name="scorekeeper" className="scorekeeper px-4">
                <div className="scorekeeper__shell">
                    <div className="scorekeeper__header">
                        <div>
                            <span className="scorekeeper__eyebrow">Game night tool</span>
                            <h3 className="text-2xl font-bold text-slate-900">Switch Scorekeeper</h3>
                            <p className="text-slate-600 mt-1">Scores are saved automatically on this device.</p>
                        </div>
                        <button
                            type="button"
                            className="scorekeeper__undo"
                            onClick={undo}
                            disabled={!state.history.length}
                        >
                            <i className="fas fa-rotate-left" aria-hidden="true"></i>
                            Undo
                        </button>
                    </div>

                    <div className="scorekeeper__formats" role="tablist" aria-label="Scoring format">
                        {Object.entries(formats).map(([key, item]) => (
                            <button
                                type="button"
                                role="tab"
                                aria-selected={state.formatKey === key}
                                className={state.formatKey === key ? 'is-active' : ''}
                                onClick={() => changeFormat(key)}
                                key={key}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    <div className="scorekeeper__summary">
                        <p>{format.description}</p>
                        {state.target && (
                            <label>
                                Target {format.unit}
                                <select
                                    value={state.target}
                                    onChange={(event) => setState((current) => ({
                                        ...current,
                                        target: Number(event.target.value),
                                        history: []
                                    }))}
                                >
                                    {[1, 2, 3, 5, 7, 10, 21, 50, 100].map((value) => (
                                        <option value={value} key={value}>{value}</option>
                                    ))}
                                </select>
                            </label>
                        )}
                    </div>

                    {winner && (
                        <div className="scorekeeper__winner" role="status">
                            <i className="fas fa-trophy" aria-hidden="true"></i>
                            {winner.name || 'Player'} wins!
                        </div>
                    )}

                    <div className={`scorekeeper__players ${state.players.length > 2 ? 'scorekeeper__players--group' : ''}`}>
                        {state.players.map((player, playerIndex) => (
                            <article className="scorekeeper__player" key={playerIndex}>
                                <label className="sr-only" htmlFor={`player-${playerIndex}`}>Player name</label>
                                <input
                                    id={`player-${playerIndex}`}
                                    className="scorekeeper__name"
                                    value={player.name}
                                    onChange={(event) => changeName(playerIndex, event.target.value)}
                                    maxLength="24"
                                />

                                {state.formatKey === 'darts' && (
                                    <div className="scorekeeper__legs">
                                        <span>Legs</span>
                                        <strong>{player.legs}</strong>
                                    </div>
                                )}

                                <div className="scorekeeper__score">
                                    <strong>{player.score}</strong>
                                    <span>{format.unit}</span>
                                </div>

                                <div className="scorekeeper__controls">
                                    {state.formatKey === 'darts' ? (
                                        <button type="button" className="scorekeeper__add" onClick={() => recordDartsLeg(playerIndex)}>
                                            Won leg
                                        </button>
                                    ) : (
                                        <>
                                            <button
                                                type="button"
                                                className="scorekeeper__subtract"
                                                onClick={() => changeScore(playerIndex, -1)}
                                                aria-label={`Remove one point from ${player.name}`}
                                            >
                                                −
                                            </button>
                                            {scoreButtons.map((amount) => (
                                                <button
                                                    type="button"
                                                    className="scorekeeper__add"
                                                    onClick={() => changeScore(playerIndex, amount)}
                                                    key={amount}
                                                >
                                                    +{amount}
                                                </button>
                                            ))}
                                        </>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="scorekeeper__footer">
                        <span><i className="fas fa-mobile-screen" aria-hidden="true"></i> Keep this page open during play</span>
                        <button type="button" onClick={resetScores}>Reset scores</button>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('ScoreKeeper component error:', error);
        reportError(error);
        return null;
    }
}
