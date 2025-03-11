function HitCounter() {
    try {
        const [countryHits, setCountryHits] = React.useState({
            'united-kingdom': 1, // Default starting value
            'england': 0,
            'scotland': 0,
            'wales': 0,
            'northern-ireland': 0
        });
        const [loading, setIsLoading] = React.useState(false);
        const [error, setError] = React.useState(null);

        React.useEffect(() => {
            const fetchHits = async () => {
                // Only attempt to fetch if we're on a custom domain
                if (isCustomDomain()) {
                    setIsLoading(true);
                    try {
                        const response = await fetch('https://api.ipapi.com/api/check?access_key=YOUR_API_KEY');
                        if (!response.ok) throw new Error('Failed to fetch location data');
                        
                        const data = await response.json();
                        if (data && data.country_code) {
                            setCountryHits(prev => ({
                                ...prev,
                                [data.country_code.toLowerCase()]: prev[data.country_code.toLowerCase()] + 1 || 1
                            }));
                        }
                    } catch (err) {
                        console.error('Error fetching hit counts:', err);
                        // Don't set error state to avoid showing error message
                        // Just use default values instead
                    } finally {
                        setIsLoading(false);
                    }
                }
            };

            fetchHits();
        }, []);

        if (loading) {
            return (
                <div data-name="hit-counter-loading" className="text-center p-4">
                    <i className="fas fa-spinner fa-spin text-blue-500 text-2xl"></i>
                </div>
            );
        }

        // Don't show any error state, just render the counter with default values
        return (
            <div data-name="hit-counter" className="mt-8 p-4">
                <h2 className="text-2xl font-bold text-center mb-6">Visitor Statistics</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {Object.entries(countryHits).map(([country, hits]) => (
                        <div 
                            key={country}
                            data-name={`country-${country}`}
                            className="flag-container flex flex-col items-center p-2 rounded-lg bg-white shadow-sm"
                        >
                            <img
                                src={countryFlags[country] || `https://flagcdn.com/h40/${country}.png`}
                                alt={`${countryNames[country] || country} flag`}
                                className="flag-image w-16 h-10 object-cover rounded"
                            />
                            <span className="hit-count mt-2 font-semibold text-gray-700">
                                {hits.toLocaleString()}
                            </span>
                            <span className="text-xs text-gray-500 mt-1">
                                {countryNames[country] || country}
                            </span>
                        </div>
                    ))}
                </div>
                {isCustomDomain() && (
                    <div className="text-center mt-4 text-sm text-gray-500">
                        <p>Running on custom domain: {formatDomainForDisplay(getCurrentDomain())}</p>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('HitCounter component error:', error);
        reportError(error);
        return null;
    }
}
