function Header() {
    try {
        // Check if on custom domain to show different styling or additional elements
        const customDomain = typeof window !== 'undefined' && !window.location.hostname.includes('trickle.host');
        
        return (
            <header data-name="header" className={`${customDomain ? 'bg-gradient-to-r from-blue-700 to-blue-900' : 'bg-gradient-to-r from-blue-600 to-blue-800'} text-white py-6 px-4`}>
                <div data-name="header-content" className="container mx-auto flex items-center justify-start gap-4">
                    <div data-name="logo" className="flex -space-x-4">
                        {['AH', 'KS', 'QD', 'JC'].map((card, index) => (
                            <img
                                key={card}
                                src={`https://deckofcardsapi.com/static/img/${card}.png`}
                                alt={`${card} card`}
                                className="h-16 w-12 transform"
                                style={{
                                    transform: `rotate(${index * 15}deg)`,
                                    zIndex: index
                                }}
                            />
                        ))}
                    </div>
                    <div>
                        <h1 data-name="title" className="text-4xl font-bold mb-2">Switch Card Game Rules</h1>
                        <p data-name="subtitle" className="text-lg">Master the game with our comprehensive guide</p>
                        {customDomain && (
                            <div className="mt-2 text-xs text-blue-200">
                                <span className="inline-flex items-center">
                                    <i className="fas fa-check-circle mr-1"></i>
                                    Running on verified domain
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </header>
        );
    } catch (error) {
        console.error('Header component error:', error);
        reportError(error);
        return null;
    }
}
