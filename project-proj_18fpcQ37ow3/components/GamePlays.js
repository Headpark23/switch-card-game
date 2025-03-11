function GamePlays() {
    try {
        return (
            <div data-name="game-plays" className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {gamePlays.map((play, index) => (
                    <div 
                        key={index}
                        data-name="game-play-card" 
                        className="bg-white p-6 rounded-lg shadow-md"
                    >
                        <div className="flex items-start gap-4">
                            <div className="text-3xl text-blue-600">
                                <i className={play.icon}></i>
                            </div>
                            <div>
                                <h3 data-name="play-title" className="text-xl font-semibold mb-3 text-blue-800">
                                    {play.title}
                                </h3>
                                <ul data-name="play-content" className="text-gray-700 space-y-2 list-disc list-inside">
                                    {Array.isArray(play.content) ? play.content.map((item, i) => (
                                        <li key={i} className="leading-relaxed">{item}</li>
                                    )) : (
                                        <li className="leading-relaxed">{play.content}</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    } catch (error) {
        console.error('GamePlays component error:', error);
        reportError(error);
        return null;
    }
}
