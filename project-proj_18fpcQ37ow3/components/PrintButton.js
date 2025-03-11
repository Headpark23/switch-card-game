function PrintButton() {
    try {
        const [isModalOpen, setIsModalOpen] = React.useState(false);

        const openModal = () => {
            setIsModalOpen(true);
        };

        const closeModal = () => {
            setIsModalOpen(false);
        };

        return (
            <div data-name="print-button-container" className="fixed bottom-4 right-4 z-40 no-print">
                <button 
                    data-name="print-button"
                    onClick={openModal}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg transition-all hover:scale-105"
                    aria-label="Print or Download Rules"
                >
                    <i className="fas fa-print text-xl"></i>
                </button>
                {isModalOpen && <PrintModal onClose={closeModal} />}
            </div>
        );
    } catch (error) {
        console.error('PrintButton component error:', error);
        reportError(error);
        return null;
    }
}
