function QuickStart() {
    try {
        const steps = [
            {
                number: '1',
                title: 'Deal seven cards',
                text: 'Give each player seven cards, then turn over the top card to begin.'
            },
            {
                number: '2',
                title: 'Match or switch',
                text: 'Match the suit or number. Play an ace to choose a new suit.'
            },
            {
                number: '3',
                title: 'Empty your hand',
                text: 'Call “Last Card” when one remains. The first player out wins.'
            }
        ];

        const scrollToSection = (id) => {
            const section = document.getElementById(id);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        };

        return (
            <section id="quick-start" data-name="quick-start" className="quick-start px-4">
                <div className="quick-start__panel">
                    <div className="quick-start__intro">
                        <span className="quick-start__eyebrow">New to Switch?</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                            Learn the game in 90 seconds
                        </h2>
                        <p className="text-slate-600 mt-2">
                            Start with the three essentials, then explore the power cards when you are ready.
                        </p>
                    </div>

                    <ol className="quick-start__steps" aria-label="Three steps to start playing Switch">
                        {steps.map((step) => (
                            <li key={step.number} className="quick-start__step">
                                <span className="quick-start__number" aria-hidden="true">{step.number}</span>
                                <div>
                                    <h3 className="font-bold text-slate-900">{step.title}</h3>
                                    <p className="text-sm text-slate-600 mt-1">{step.text}</p>
                                </div>
                            </li>
                        ))}
                    </ol>

                    <div className="quick-start__actions">
                        <button
                            type="button"
                            className="quick-start__primary"
                            onClick={() => scrollToSection('special-cards')}
                        >
                            See the power cards
                            <i className="fas fa-arrow-down" aria-hidden="true"></i>
                        </button>
                        <button
                            type="button"
                            className="quick-start__secondary"
                            onClick={() => scrollToSection('simulation')}
                        >
                            Watch an example game
                        </button>
                    </div>
                </div>
            </section>
        );
    } catch (error) {
        console.error('QuickStart component error:', error);
        reportError(error);
        return null;
    }
}
