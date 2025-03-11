function SearchBar({ onSearch }) {
    try {
        return (
            <div data-name="search-container" className="w-full max-w-2xl mx-auto my-6 px-4">
                <div data-name="search-wrapper" className="relative">
                    <input
                        data-name="search-input"
                        type="text"
                        placeholder="Search rules..."
                        onChange={(e) => onSearch(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <i className="fas fa-search absolute right-3 top-3 text-gray-400"></i>
                </div>
            </div>
        );
    } catch (error) {
        console.error('SearchBar component error:', error);
        reportError(error);
        return null;
    }
}
