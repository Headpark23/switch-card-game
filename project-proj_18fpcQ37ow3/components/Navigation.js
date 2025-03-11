function Navigation() {
    try {
        const sections = [
            { id: "rules", title: "Game Rules" },
            { id: "special-cards", title: "Special Cards" },
            { id: "game-plays", title: "Different Game Plays" },
            { id: "game-flow", title: "Game Flow" },
            { id: "simulation", title: "Game Simulation" }
        ];

        return (
            <nav data-name="navigation" className="sticky top-0 bg-white shadow-md z-50">
                <div className="container mx-auto px-4 py-2">
                    <ul className="flex flex-wrap justify-center gap-4">
                        {sections.map((section) => (
                            <li key={section.id}>
                                <a
                                    href={`#${section.id}`}
                                    className="text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md hover:bg-blue-50 transition-colors"
                                >
                                    {section.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        );
    } catch (error) {
        console.error('Navigation component error:', error);
        reportError(error);
        return null;
    }
}
