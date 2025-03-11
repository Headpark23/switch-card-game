function RuleCard({ title, content, icon }) {
    try {
        return (
            <div data-name="rule-card" className="bg-white p-6 rounded-lg shadow-md mb-4 rule-card">
                <div className="flex items-start gap-4">
                    <div className="text-3xl text-blue-600">
                        <i className={icon}></i>
                    </div>
                    <div>
                        <h3 data-name="rule-title" className="text-xl font-semibold mb-3 text-blue-800">
                            {title}
                        </h3>
                        <ul data-name="rule-content" className="text-gray-700 space-y-2 list-disc list-inside">
                            {Array.isArray(content) ? content.map((item, index) => (
                                <li key={index} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: item }}></li>
                            )) : (
                                <li className="leading-relaxed" dangerouslySetInnerHTML={{ __html: content }}></li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('RuleCard component error:', error);
        reportError(error);
        return null;
    }
}
