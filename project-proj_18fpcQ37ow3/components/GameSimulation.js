function GameSimulation() {
    try {
        const [currentStep, setCurrentStep] = React.useState(0);
        const [gameState, setGameState] = React.useState({
            currentPlayer: 0,
            topCard: '3H',
            hands: [
                ['7H', 'KH', '2D', 'AC', 'QH', '8H', '4H'],
                ['5H', '6H', '2H', '8D', '9D', 'JD', '3D']
            ],
            playedCards: ['3H'],
            currentSuit: 'H',
            lastCardCalled: false,
            cardsToPickUp: 0,
            direction: 1,
            winner: null,
            gameMessage: '',
            specialCardEffects: []
        });

        const gameSteps = [
            {
                description: "Player 1 plays 7♥ matching the suit",
                action: () => {
                    const newHands = [...gameState.hands];
                    newHands[0] = newHands[0].filter(card => card !== '7H');
                    setGameState(prev => ({
                        ...prev,
                        hands: newHands,
                        topCard: '7H',
                        currentPlayer: 0,
                        playedCards: [...prev.playedCards, '7H'],
                        currentSuit: 'H',
                        gameMessage: 'Player 1 plays again (seven)',
                        specialCardEffects: ['Play again']
                    }));
                }
            },
            {
                description: "Player 1 plays K♥ matching the suit",
                action: () => {
                    const newHands = [...gameState.hands];
                    newHands[0] = newHands[0].filter(card => card !== 'KH');
                    setGameState(prev => ({
                        ...prev,
                        hands: newHands,
                        topCard: 'KH',
                        currentPlayer: 1,
                        playedCards: [...prev.playedCards, 'KH'],
                        currentSuit: 'H',
                        gameMessage: 'Player 1 matches hearts',
                        specialCardEffects: []
                    }));
                }
            },
            {
                description: "Player 2 plays 5♥ matching the suit",
                action: () => {
                    const newHands = [...gameState.hands];
                    newHands[1] = newHands[1].filter(card => card !== '5H');
                    setGameState(prev => ({
                        ...prev,
                        hands: newHands,
                        topCard: '5H',
                        currentPlayer: 0,
                        playedCards: [...prev.playedCards, '5H'],
                        currentSuit: 'H',
                        gameMessage: 'Player 2 matches hearts',
                        specialCardEffects: []
                    }));
                }
            },
            {
                description: "Player 1 plays A♣ and changes suit to ♦",
                action: () => {
                    const newHands = [...gameState.hands];
                    newHands[0] = newHands[0].filter(card => card !== 'AC');
                    setGameState(prev => ({
                        ...prev,
                        hands: newHands,
                        topCard: 'AC',
                        currentPlayer: 1,
                        playedCards: [...prev.playedCards, 'AC'],
                        currentSuit: 'D',
                        gameMessage: 'Player 1 changes suit to diamonds',
                        specialCardEffects: ['Suit changed to ♦']
                    }));
                }
            },
            {
                description: "Player 2 plays 9♦ matching the suit",
                action: () => {
                    const newHands = [...gameState.hands];
                    newHands[1] = newHands[1].filter(card => card !== '9D');
                    setGameState(prev => ({
                        ...prev,
                        hands: newHands,
                        topCard: '9D',
                        currentPlayer: 0,
                        playedCards: [...prev.playedCards, '9D'],
                        currentSuit: 'D',
                        gameMessage: 'Player 2 matches diamonds',
                        specialCardEffects: []
                    }));
                }
            },
            {
                description: "Player 1 plays 2♦ - next player picks up 2",
                action: () => {
                    const newHands = [...gameState.hands];
                    newHands[0] = newHands[0].filter(card => card !== '2D');
                    setGameState(prev => ({
                        ...prev,
                        hands: newHands,
                        topCard: '2D',
                        currentPlayer: 1,
                        playedCards: [...prev.playedCards, '2D'],
                        currentSuit: 'D',
                        cardsToPickUp: 2,
                        gameMessage: 'Player 2 must pick up 2 cards',
                        specialCardEffects: ['Pick up 2']
                    }));
                }
            },
            {
                description: "Player 2 plays 2♥ - next player picks up 4",
                action: () => {
                    const newHands = [...gameState.hands];
                    newHands[1] = newHands[1].filter(card => card !== '2H');
                    setGameState(prev => ({
                        ...prev,
                        hands: newHands,
                        topCard: '2H',
                        currentPlayer: 0,
                        playedCards: [...prev.playedCards, '2H'],
                        currentSuit: 'H',
                        cardsToPickUp: 4,
                        gameMessage: 'Player 1 must pick up 4 cards',
                        specialCardEffects: ['Pick up 4']
                    }));
                }
            },
            {
                description: "Player 1 must pick up 4 cards",
                action: () => {
                    const newHands = [...gameState.hands];
                    const newCards = ['3S', '4C', '5S', '6C'];
                    newHands[0] = [...newHands[0], ...newCards];
                    setGameState(prev => ({
                        ...prev,
                        hands: newHands,
                        currentPlayer: 1,
                        cardsToPickUp: 0,
                        gameMessage: 'Player 1 picks up 4 cards',
                        specialCardEffects: []
                    }));
                }
            },
            {
                description: "Player 2 plays 6♥ matching the suit",
                action: () => {
                    const newHands = [...gameState.hands];
                    newHands[1] = newHands[1].filter(card => card !== '6H');
                    setGameState(prev => ({
                        ...prev,
                        hands: newHands,
                        topCard: '6H',
                        currentPlayer: 0,
                        playedCards: [...prev.playedCards, '6H'],
                        currentSuit: 'H',
                        gameMessage: "Player 2 matches hearts",
                        specialCardEffects: []
                    }));
                }
            },
            {
                description: "Player 1 plays 8♥ - attempting to make next player miss turn",
                action: () => {
                    const newHands = [...gameState.hands];
                    newHands[0] = newHands[0].filter(card => card !== '8H');
                    setGameState(prev => ({
                        ...prev,
                        hands: newHands,
                        topCard: '8H',
                        currentPlayer: 1,
                        playedCards: [...prev.playedCards, '8H'],
                        currentSuit: 'H',
                        gameMessage: 'Player 1 plays eight of hearts',
                        specialCardEffects: ['Miss a turn']
                    }));
                }
            },
            {
                description: "Player 2 counters with 8♦ - passing miss turn to Player 1",
                action: () => {
                    const newHands = [...gameState.hands];
                    newHands[1] = newHands[1].filter(card => card !== '8D');
                    setGameState(prev => ({
                        ...prev,
                        hands: newHands,
                        topCard: '8D',
                        currentPlayer: 1,
                        playedCards: [...prev.playedCards, '8D'],
                        currentSuit: 'D',
                        gameMessage: "Player 2 counters with eight of diamonds - Player 1 misses turn",
                        specialCardEffects: ['Miss a turn']
                    }));
                }
            },
            {
                description: "Player 2 plays J♦ and calls 'Last Card!'",
                action: () => {
                    const newHands = [...gameState.hands];
                    newHands[1] = newHands[1].filter(card => card !== 'JD');
                    setGameState(prev => ({
                        ...prev,
                        hands: newHands,
                        topCard: 'JD',
                        currentPlayer: 1, // Play returns to Player 2 due to reverse
                        playedCards: [...prev.playedCards, 'JD'],
                        currentSuit: 'D',
                        direction: -1,
                        lastCardCalled: true,
                        gameMessage: "Player 2 calls 'Last Card!' and reverses play direction",
                        specialCardEffects: ['Reverse direction']
                    }));
                }
            },
            {
                description: "Player 2 plays 3♦ and wins the game!",
                action: () => {
                    const newHands = [...gameState.hands];
                    newHands[1] = newHands[1].filter(card => card !== '3D');
                    
                    // First show the card being played
                    setGameState(prev => ({
                        ...prev,
                        hands: [prev.hands[0], []],
                        topCard: '3D',
                        currentPlayer: 1,
                        playedCards: [...prev.playedCards, '3D'],
                        currentSuit: 'D',
                        gameMessage: 'Player 2 plays their final card!',
                        specialCardEffects: []
                    }));

                    // After a short delay, update to show the win
                    setTimeout(() => {
                        setGameState(prev => ({
                            ...prev,
                            winner: 1,
                            gameMessage: 'Player 2 wins the game!',
                            specialCardEffects: ['Game Over']
                        }));
                    }, 1000);
                }
            }
        ];

        const handleNextStep = () => {
            if (currentStep >= gameSteps.length) {
                // Reset the game
                setCurrentStep(0);
                setGameState({
                    currentPlayer: 0,
                    topCard: '3H',
                    hands: [
                        ['7H', 'KH', '2D', 'AC', 'QH', '8H', '4H'],
                        ['5H', '6H', '2H', '8D', '9D', 'JD', '3D']
                    ],
                    playedCards: ['3H'],
                    currentSuit: 'H',
                    lastCardCalled: false,
                    cardsToPickUp: 0,
                    direction: 1,
                    winner: null,
                    gameMessage: '',
                    specialCardEffects: []
                });
            } else {
                gameSteps[currentStep].action();
                setCurrentStep(prev => prev + 1);
            }
        };

        const handlePreviousStep = () => {
            if (currentStep <= 1) {
                // Already at the beginning, reset to initial state
                setCurrentStep(0);
                setGameState({
                    currentPlayer: 0,
                    topCard: '3H',
                    hands: [
                        ['7H', 'KH', '2D', 'AC', 'QH', '8H', '4H'],
                        ['5H', '6H', '2H', '8D', '9D', 'JD', '3D']
                    ],
                    playedCards: ['3H'],
                    currentSuit: 'H',
                    lastCardCalled: false,
                    cardsToPickUp: 0,
                    direction: 1,
                    winner: null,
                    gameMessage: '',
                    specialCardEffects: []
                });
            } else {
                // Go back to beginning and replay up to previous step
                const targetStep = currentStep - 2;
                setCurrentStep(0);
                setGameState({
                    currentPlayer: 0,
                    topCard: '3H',
                    hands: [
                        ['7H', 'KH', '2D', 'AC', 'QH', '8H', '4H'],
                        ['5H', '6H', '2H', '8D', '9D', 'JD', '3D']
                    ],
                    playedCards: ['3H'],
                    currentSuit: 'H',
                    lastCardCalled: false,
                    cardsToPickUp: 0,
                    direction: 1,
                    winner: null,
                    gameMessage: '',
                    specialCardEffects: []
                });

                // Execute all steps up to the target step
                for (let i = 0; i <= targetStep; i++) {
                    gameSteps[i].action();
                }
                setCurrentStep(targetStep + 1);
            }
        };

        const renderFannedHand = (hand, isCurrentPlayer, playerNumber) => {
            if (gameState.winner === playerNumber) {
                return (
                    <div data-name="winner-display" className="flex items-center justify-center">
                        <i className="fas fa-trophy text-6xl text-yellow-500"></i>
                    </div>
                );
            }
            
            const handWidth = hand.length * 20 + 16;
            
            return (
                <div data-name="hand-container" className="relative h-24 flex justify-center">
                    <div 
                        data-name="cards-container"
                        className="relative" 
                        style={{ width: `${handWidth}px` }}
                    >
                        {hand.map((card, index) => (
                            <img
                                key={card}
                                data-name={`card-${card}`}
                                src={`https://deckofcardsapi.com/static/img/${card}.png`}
                                alt={card}
                                className={`absolute h-24 w-16 transition-transform ${
                                    isCurrentPlayer ? 'ring-2 ring-blue-500' : ''
                                }`}
                                style={{
                                    left: `${index * 20}px`,
                                    transform: `rotate(${(index - hand.length/2) * 5}deg)`,
                                    transformOrigin: 'bottom center'
                                }}
                            />
                        ))}
                        {gameState.cardsToPickUp > 0 && isCurrentPlayer && (
                            <div data-name="pickup-indicator" className="absolute -top-8 left-0 right-0 text-center bg-red-500 text-white px-2 py-1 rounded-full">
                                Pick up {gameState.cardsToPickUp}
                            </div>
                        )}
                        {hand.length === 2 && !gameState.lastCardCalled && isCurrentPlayer && (
                            <div data-name="last-card-warning" className="absolute -top-8 left-0 right-0 text-center bg-yellow-500 text-white px-2 py-1 rounded-full">
                                Call "Last Card"!
                            </div>
                        )}
                    </div>
                </div>
            );
        };

        const renderSpecialEffects = () => {
            if (!gameState.specialCardEffects.length) return null;

            return (
                <div data-name="special-effects" className="flex justify-center gap-2 my-2">
                    {gameState.specialCardEffects.map((effect, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                        >
                            {effect}
                        </span>
                    ))}
                </div>
            );
        };

        return (
            <div data-name="game-simulation" className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
                <div data-name="game-board" className="space-y-8">
                    <div data-name="player-1" className={`p-4 rounded-lg text-center ${0 === gameState.currentPlayer ? 'bg-blue-50' : 'bg-gray-50'}`}>
                        <h4 className="text-sm font-semibold mb-2">Player 1</h4>
                        <div className="flex justify-center">
                            {renderFannedHand(gameState.hands[0], 0 === gameState.currentPlayer, 0)}
                        </div>
                        {gameState.currentPlayer === 0 && currentStep < gameSteps.length && (
                            <p data-name="player-1-message" className="mt-4 text-gray-600">
                                {gameSteps[currentStep].description}
                            </p>
                        )}
                    </div>

                    <div data-name="direction-indicator" className="text-center">
                        <i className={`fas fa-arrow-${gameState.direction === 1 ? 'right' : 'left'} text-2xl text-blue-500`}></i>
                    </div>

                    <div data-name="game-center" className="flex justify-center items-center gap-8">
                        <img
                            data-name="deck"
                            src="https://deckofcardsapi.com/static/img/back.png"
                            alt="Deck"
                            className="h-24 w-16 shadow-lg"
                        />
                        <div data-name="played-cards" className="relative h-32 w-32">
                            {gameState.playedCards.slice(-3).map((card, index, arr) => (
                                <img
                                    key={card + index}
                                    src={`https://deckofcardsapi.com/static/img/${card}.png`}
                                    alt={card}
                                    className="absolute left-1/2 top-1/2 h-24 w-16"
                                    style={{
                                        transform: `translate(-50%, -50%) rotate(${(index - arr.length/2) * 15}deg)`,
                                        zIndex: index
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {renderSpecialEffects()}

                    {gameState.gameMessage && (
                        <div data-name="game-message" className="text-center">
                            <p className="text-lg font-semibold text-blue-600">
                                {gameState.gameMessage}
                            </p>
                        </div>
                    )}

                    <div data-name="game-controls" className="text-center py-4">
                        <div className="flex justify-center gap-4">
                            <button
                                data-name="previous-button"
                                onClick={handlePreviousStep}
                                disabled={currentStep === 0}
                                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous Move
                            </button>
                            <button
                                data-name="next-button"
                                onClick={handleNextStep}
                                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                {currentStep >= gameSteps.length ? "Replay Game" : "Next Move"}
                            </button>
                        </div>
                        {currentStep >= gameSteps.length && (
                            <p data-name="replay-message" className="mt-2 text-gray-600">
                                Click to replay the game
                            </p>
                        )}
                    </div>

                    <div data-name="player-2" className={`p-4 rounded-lg text-center ${1 === gameState.currentPlayer ? 'bg-blue-50' : 'bg-gray-50'}`}>
                        {gameState.currentPlayer === 1 && currentStep < gameSteps.length && (
                            <p data-name="player-2-message" className="mb-4 text-gray-600">
                                {gameSteps[currentStep].description}
                            </p>
                        )}
                        <h4 className="text-sm font-semibold mb-2">Player 2</h4>
                        <div className="flex justify-center">
                            {renderFannedHand(gameState.hands[1], 1 === gameState.currentPlayer, 1)}
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('GameSimulation component error:', error);
        reportError(error);
        return null;
    }
}
