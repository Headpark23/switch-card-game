function App() {
  try {
    // Check if we're on a custom domain
    const isCustomDomain = typeof window !== 'undefined' && !window.location.hostname.includes('trickle.host');
    return (
      <div data-name="app" className="min-h-screen bg-gray-50">
        <Header />
        <Navigation />
        {!isCustomDomain && (
          <div className="bg-yellow-50 border-b border-yellow-200 p-2 text-center text-sm text-yellow-800">
            <i className="fas fa-exclamation-triangle mr-2"></i>
            Running on trickle.host domain. For full functionality including Google AdSense, please use a custom domain.
          </div>
        )}
        <main data-name="main-content" className="container mx-auto py-4">
          <AdUnit slot="1234567890" />

          <section id="rules" data-name="rules-section">
            <h2 data-name="section-title" className="text-2xl font-bold text-center section-title">Game Rules</h2>
            <div data-name="rules-grid" className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-4">
              {gameRules.map((rule, index) => (
                <RuleCard key={index} title={rule.title} content={rule.content} icon={rule.icon} />
              ))}
            </div>
          </section>

          <AdUnit slot="9876543210" />

          <section id="special-cards" data-name="special-cards-section">
            <h2 data-name="section-title" className="text-2xl font-bold text-center section-title">Special Cards</h2>
            <SpecialCards />
          </section>

          <section id="game-plays" data-name="game-plays-section">
            <h2 data-name="section-title" className="text-2xl font-bold text-center section-title">Different Game Plays</h2>
            <GamePlays />
          </section>

          <AdUnit slot="5432109876" />

          <section id="game-flow" data-name="flowchart-section">
            <h2 data-name="section-title" className="text-2xl font-bold text-center section-title">Game Flow</h2>
            <Flowchart />
          </section>

          <section id="simulation" data-name="simulation-section">
            <h2 data-name="section-title" className="text-2xl font-bold text-center section-title">Game Simulation</h2>
            <GameSimulation />
          </section>

          {/* Chat / Comments section — id required for the Chat tab to scroll here */}
          <section id="comments" data-name="comments-section">
            <CommentSection />
          </section>

          <HitCounter />
        </main>
        <PrintButton />
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    reportError(error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

