function Header() {
  try {
    const customDomain = typeof window !== 'undefined' && !window.location.hostname.includes('trickle.host');
    return (
      <header
        data-name="header"
        className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-6 px-4 shadow-lg"
      >
        <div
          data-name="header-content"
          className="container mx-auto flex items-center justify-start gap-6"
        >
          {/* Fanned playing card logo */}
          <div data-name="logo" className="flex flex-shrink-0" style={{ marginRight: '0.5rem' }}>
            {[
              { code: 'AH', label: 'Ace of Hearts' },
              { code: 'KS', label: 'King of Spades' },
              { code: 'QD', label: 'Queen of Diamonds' },
              { code: 'JC', label: 'Jack of Clubs' }
            ].map(function(card, index) {
              return (
                <img
                  key={card.code}
                  src={'https://deckofcardsapi.com/static/img/' + card.code + '.png'}
                  alt={card.label}
                  className="rounded shadow-xl"
                  style={{
                    height: '72px',
                    width: '52px',
                    transform: 'rotate(' + ((index - 1.5) * 12) + 'deg) translateY(' + (Math.abs(index - 1.5) * 4) + 'px)',
                    zIndex: index,
                    marginLeft: index > 0 ? '-14px' : '0',
                    transition: 'transform 0.2s ease'
                  }}
                />
              );
            })}
          </div>

          {/* Title & subtitle */}
          <div>
            <h1 data-name="title" className="text-3xl md:text-4xl font-bold mb-1 tracking-tight">
              Switch Card Game Rules
            </h1>
            <p data-name="subtitle" className="text-blue-200 text-sm md:text-base">
              Never argue with your loved ones again! The complete guide to playing Switch properly.
            </p>
            {customDomain && (
              <div className="mt-2 text-xs text-blue-300">
                <span className="inline-flex items-center gap-1">
                  <i className="fas fa-check-circle"></i>
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
