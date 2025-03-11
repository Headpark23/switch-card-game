function Flowchart() {
    try {
        const steps = [
            {
                number: 1,
                text: "Deal 7 cards to each player",
                visual: (
                    <div className="flex justify-center gap-1">
                        {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                            <img 
                                key={n}
                                src="https://deckofcardsapi.com/static/img/back.png"
                                alt="Card back"
                                className="h-12 w-9 -ml-6 first:ml-0"
                            />
                        ))}
                    </div>
                )
            },
            {
                number: 2,
                text: "Dealer turns over top card",
                visual: (
                    <div className="flex justify-center items-center gap-4">
                        <img 
                            src="https://deckofcardsapi.com/static/img/back.png"
                            alt="Deck"
                            className="h-16 w-12"
                        />
                        <i className="fas fa-arrow-right text-blue-500"></i>
                        <img 
                            src="https://deckofcardsapi.com/static/img/3H.png"
                            alt="Turned card"
                            className="h-16 w-12"
                        />
                    </div>
                )
            },
            {
                number: 3,
                text: "Players match suit/number or play special card",
                visual: (
                    <div className="flex justify-center items-center gap-4">
                        <img 
                            src="https://deckofcardsapi.com/static/img/3H.png"
                            alt="Current card"
                            className="h-16 w-12"
                        />
                        <i className="fas fa-exchange-alt text-blue-500"></i>
                        <div className="flex gap-2">
                            <img 
                                src="https://deckofcardsapi.com/static/img/3C.png"
                                alt="Matching number"
                                className="h-16 w-12"
                            />
                            <img 
                                src="https://deckofcardsapi.com/static/img/9H.png"
                                alt="Matching suit"
                                className="h-16 w-12"
                            />
                            <div className="flex -space-x-3">
                                <img 
                                    src="https://deckofcardsapi.com/static/img/AS.png"
                                    alt="Ace option"
                                    className="h-16 w-12"
                                />
                                <img 
                                    src="https://deckofcardsapi.com/static/img/AH.png"
                                    alt="Ace option"
                                    className="h-16 w-12"
                                />
                                <img 
                                    src="https://deckofcardsapi.com/static/img/AD.png"
                                    alt="Ace option"
                                    className="h-16 w-12"
                                />
                                <img 
                                    src="https://deckofcardsapi.com/static/img/AC.png"
                                    alt="Ace option"
                                    className="h-16 w-12"
                                />
                            </div>
                        </div>
                    </div>
                )
            },
            {
                number: 4,
                text: 'Shout "Last Card" when one card remains',
                visual: (
                    <div className="flex justify-center items-center gap-4">
                        <img 
                            src="https://deckofcardsapi.com/static/img/back.png"
                            alt="Last card"
                            className="h-16 w-12"
                        />
                        <div className="bg-yellow-100 px-4 py-2 rounded-full">
                            <i className="fas fa-bullhorn text-yellow-600 mr-2"></i>
                            <span className="text-yellow-800 font-bold">"LAST CARD!"</span>
                        </div>
                    </div>
                )
            },
            {
                number: 5,
                text: "First player to play all cards wins",
                visual: (
                    <div className="flex justify-center items-center gap-4">
                        <i className="fas fa-trophy text-4xl text-yellow-500"></i>
                        <div className="flex items-center">
                            <i className="fas fa-hand-paper text-2xl text-gray-400 transform -rotate-45"></i>
                            <span className="text-lg font-bold ml-2">0 cards</span>
                        </div>
                    </div>
                )
            }
        ];

        return (
            <div data-name="flowchart" className="flowchart-container p-4">
                <div data-name="flowchart-content" className="bg-white p-6 rounded-lg shadow-md">
                    <div data-name="flow-steps" className="space-y-8">
                        {steps.map((step, index) => (
                            <div key={index} className="space-y-6">
                                <div data-name="step" className="flex items-center">
                                    <div className="bg-blue-500 rounded-full p-3 text-white min-w-[2.5rem] text-center">
                                        {step.number}
                                    </div>
                                    <div className="ml-4 flex-grow">{step.text}</div>
                                </div>
                                <div data-name="step-visual" className="bg-gray-50 p-4 rounded-lg">
                                    {step.visual}
                                </div>
                                {index < steps.length - 1 && (
                                    <div className="text-center">
                                        <i className="fas fa-chevron-down text-blue-300"></i>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Flowchart component error:', error);
        reportError(error);
        return null;
    }
}
