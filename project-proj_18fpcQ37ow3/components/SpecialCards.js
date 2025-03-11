function SpecialCards() {
    try {
        const specialCards = [
            { 
                cards: ["KS", "KC"],
                title: "Black Kings",
                effect: [
                    "Next player must pick up 5 cards",
                    "Two black kings played = pick up 10 cards"
                ]
            },
            { 
                cards: ["KH", "KD"],
                title: "Red Kings",
                effect: [
                    "Cancels the effect of black kings",
                    "Need one red king for each black king played",
                    "Two black kings require two red kings to cancel"
                ]
            },
            { 
                cards: ["2H", "2S", "2D", "2C"],
                title: "Two of Any Suit",
                effect: [
                    "Next player picks up 2 cards",
                    "Can be chained with another two",
                    "Each two adds 2 cards to pick up",
                    "Maximum of 8 cards (4 twos played)"
                ]
            },
            { 
                cards: ["8H", "8S", "8D", "8C"],
                title: "Eight of Any Suit",
                effect: [
                    "Next player misses their turn",
                    "Can be countered with another eight",
                    "Effect passes to next player"
                ]
            },
            { 
                cards: ["7H", "7S", "7D", "7C"],
                title: "Seven of Any Suit",
                effect: [
                    "Play again",
                    "Cannot be used as your last card",
                    "Would require you to play again"
                ]
            },
            { 
                cards: ["JH", "JS", "JD", "JC"],
                title: "Jack of Any Suit",
                effect: [
                    "Reverses play direction",
                    "1 or 3 jacks = reverse direction",
                    "2 or 4 jacks = original direction",
                    "Cannot be last card in 2-player games"
                ]
            },
            { 
                cards: ["AH", "AS", "AD", "AC"],
                title: "Ace of Any Suit",
                effect: [
                    "Change the current suit to any suit",
                    "Can be played on any card except: Black Kings, Two's or Eight's"
                ]
            }
        ];

        return (
            <div data-name="special-cards" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {specialCards.map((specialCard, index) => (
                    <div data-name="special-card" key={index} className="bg-white p-4 rounded-lg shadow-md card-container">
                        <div data-name="card-images" className="flex gap-2 mb-3 justify-center">
                            {specialCard.cards.map((card, cardIndex) => (
                                <img 
                                    key={cardIndex}
                                    src={`https://deckofcardsapi.com/static/img/${card}.png`}
                                    alt={`${card} card`}
                                    className="h-16 w-12 object-contain"
                                />
                            ))}
                        </div>
                        <h4 data-name="card-title" className="text-lg font-semibold text-blue-700 text-center mb-2">
                            {specialCard.title}
                        </h4>
                        <ul data-name="card-effect" className="text-gray-600 text-sm space-y-1 list-disc list-inside">
                            {Array.isArray(specialCard.effect) ? specialCard.effect.map((item, i) => (
                                <li key={i} className="leading-relaxed">{item}</li>
                            )) : (
                                <li className="leading-relaxed">{specialCard.effect}</li>
                            )}
                        </ul>
                    </div>
                ))}
            </div>
        );
    } catch (error) {
        console.error('SpecialCards component error:', error);
        reportError(error);
        return null;
    }
}
