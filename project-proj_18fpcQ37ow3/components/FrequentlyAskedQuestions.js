function FrequentlyAskedQuestions() {
    try {
        const questions = [
            {
                question: 'How do you play the Switch card game?',
                answer: 'Deal seven cards to each player. On your turn, match the suit or value of the card on the discard pile, play a valid power card, or pick up a card if you cannot play.'
            },
            {
                question: 'How many cards do you start with in Switch?',
                answer: 'Each player starts with seven cards. Turn over the top card from the remaining deck to begin the discard pile.'
            },
            {
                question: 'What do the special cards do in Switch?',
                answer: 'Twos make the next player pick up two, eights make a player miss a turn, sevens let you play again, jacks reverse direction, aces change suit and black kings make the next player pick up five.'
            },
            {
                question: 'Can you put down more than one card in Switch?',
                answer: 'Yes. Under these house rules, cards of the same value may be played together, provided the first card matches the current suit or value.'
            },
            {
                question: 'What happens if you forget to say Last Card?',
                answer: 'You must call “Last Card” when only one card remains in your hand. If you forget, the penalty is to pick up two cards.'
            },
            {
                question: 'Is Switch the same as Crazy Eights or Blackjack?',
                answer: 'They belong to the same family of shedding games, but the names and power-card rules vary between families and regions. This guide explains the version used on this website.'
            }
        ];

        return (
            <div data-name="faq" className="faq px-4">
                <div className="faq__intro">
                    <p className="faq__eyebrow">Quick answers</p>
                    <p>Common questions about playing Switch with a standard pack of cards.</p>
                </div>
                <div className="faq__list">
                    {questions.map((item, index) => (
                        <details className="faq__item" key={item.question} open={index === 0}>
                            <summary>{item.question}</summary>
                            <p>{item.answer}</p>
                        </details>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('FrequentlyAskedQuestions component error:', error);
        reportError(error);
        return null;
    }
}
