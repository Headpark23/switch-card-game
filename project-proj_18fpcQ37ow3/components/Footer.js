function Footer() {
    return (
        <footer className="site-footer">
            <div className="container mx-auto px-4">
                <p>© {new Date().getFullYear()} Switch Card Game</p>
                <nav aria-label="Footer navigation">
                    <a href="/privacy.html">Privacy &amp; cookies</a>
                    <a href="mailto:privacy@switchcardgame.co.uk">Contact</a>
                </nav>
            </div>
        </footer>
    );
}
