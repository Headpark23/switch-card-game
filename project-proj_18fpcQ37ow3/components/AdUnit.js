function AdUnit({ slot }) {
    try {
        React.useEffect(() => {
            try {
                // Check if we're on a custom domain
                const isCustomDomain = !window.location.hostname.includes('trickle.host');
                
                // Only initialize ads if we're on a custom domain or in production
                if (isCustomDomain || process.env.NODE_ENV === 'production') {
                    (window.adsbygoogle = window.adsbygoogle || []).push({});
                }
            } catch (error) {
                console.error('AdSense error:', error);
            }
        }, []);

        // Check if we're on a custom domain for conditional rendering
        const isCustomDomain = typeof window !== 'undefined' && 
            !window.location.hostname.includes('trickle.host');
        
        // If we're on trickle.host, show a placeholder instead
        if (!isCustomDomain) {
            return (
                <div data-name="ad-placeholder" className="my-4 text-center p-4 bg-gray-100 rounded-md">
                    <p className="text-gray-500">
                        <i className="fas fa-ad mr-2"></i>
                        Advertisement placeholder (AdSense requires custom domain)
                    </p>
                </div>
            );
        }

        return (
            <div data-name="ad-container" className="my-4 text-center">
                <ins
                    className="adsbygoogle"
                    style={{ display: 'block' }}
                    data-ad-client="ca-pub-391236143887214"
                    data-ad-slot={slot}
                    data-ad-format="auto"
                    data-full-width-responsive="true"
                />
            </div>
        );
    } catch (error) {
        console.error('AdUnit component error:', error);
        reportError(error);
        return null;
    }
}
