function PrintModal({ onClose }) {
    try {
        const [sections, setSections] = React.useState({
            rules: true,
            specialCards: true,
            gamePlays: true,
            gameFlow: true,
            simulation: false
        });
        
        const [format, setFormat] = React.useState('pdf');
        const [isGenerating, setIsGenerating] = React.useState(false);
        const [previewHtml, setPreviewHtml] = React.useState('');
        
        React.useEffect(() => {
            // Generate preview HTML when sections change
            generatePreviewContent();
        }, [sections]);
        
        const handleSectionToggle = (section) => {
            setSections(prev => ({
                ...prev,
                [section]: !prev[section]
            }));
        };
        
        const handleSelectAll = () => {
            setSections({
                rules: true,
                specialCards: true,
                gamePlays: true,
                gameFlow: true,
                simulation: true
            });
        };
        
        const handleSelectNone = () => {
            setSections({
                rules: false,
                specialCards: false,
                gamePlays: false,
                gameFlow: false,
                simulation: false
            });
        };
        
        const generatePreviewContent = () => {
            // Create a simplified preview of what will be printed
            let preview = `
                <div class="print-preview">
                    <h1 class="text-2xl font-bold text-center mb-4">Switch Card Game Rules</h1>
            `;
            
            if (sections.rules) {
                preview += `
                    <h2 class="text-xl font-semibold mb-2">Game Rules</h2>
                    <p>Basic setup, playing cards, power cards, last card rule, and finishing rules.</p>
                `;
            }
            
            if (sections.specialCards) {
                preview += `
                    <h2 class="text-xl font-semibold mb-2">Special Cards</h2>
                    <p>Details about Black Kings, Red Kings, Twos, Eights, Sevens, Jacks, and Aces.</p>
                `;
            }
            
            if (sections.gamePlays) {
                preview += `
                    <h2 class="text-xl font-semibold mb-2">Different Game Plays</h2>
                    <p>One v One, Knock Out Play, Group Play, Darts Scoring, and Switch Cup.</p>
                `;
            }
            
            if (sections.gameFlow) {
                preview += `
                    <h2 class="text-xl font-semibold mb-2">Game Flow</h2>
                    <p>Step-by-step guide to playing the game.</p>
                `;
            }
            
            if (sections.simulation) {
                preview += `
                    <h2 class="text-xl font-semibold mb-2">Game Simulation</h2>
                    <p>Interactive example of gameplay.</p>
                `;
            }
            
            preview += `
                <div class="mt-4 text-sm text-gray-500">
                    <p>Generated from SwitchCardGameRules.com</p>
                    <p>Scan QR code to access the online version</p>
                </div>
            </div>`;
            
            setPreviewHtml(preview);
        };
        
        const handleExport = async () => {
            try {
                setIsGenerating(true);
                
                if (format === 'print') {
                    // Set print-specific classes on body
                    document.body.classList.add('printing');
                    
                    // Create a hidden iframe for printing
                    const printFrame = document.createElement('iframe');
                    printFrame.style.position = 'fixed';
                    printFrame.style.right = '0';
                    printFrame.style.bottom = '0';
                    printFrame.style.width = '0';
                    printFrame.style.height = '0';
                    printFrame.style.border = '0';
                    document.body.appendChild(printFrame);
                    
                    // Generate print content
                    const printContent = await generatePrintContent(sections);
                    
                    // Write to iframe and print
                    printFrame.contentDocument.write(printContent);
                    printFrame.contentDocument.close();
                    
                    // Wait for resources to load
                    setTimeout(() => {
                        printFrame.contentWindow.print();
                        document.body.removeChild(printFrame);
                        document.body.classList.remove('printing');
                        setIsGenerating(false);
                        onClose();
                    }, 1000);
                } else {
                    // Generate PDF
                    await generatePDF(sections);
                    setIsGenerating(false);
                    onClose();
                }
            } catch (error) {
                console.error('Error during export:', error);
                setIsGenerating(false);
                reportError(error);
            }
        };
        
        return (
            <div data-name="print-modal-overlay" className="print-modal-overlay" onClick={onClose}>
                <div data-name="print-modal" className="print-modal" onClick={e => e.stopPropagation()}>
                    <div data-name="print-modal-header" className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">Print or Download Rules</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <i className="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    
                    <div data-name="print-format-selector" className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">Select Format:</h3>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="radio" 
                                    name="format" 
                                    value="pdf" 
                                    checked={format === 'pdf'} 
                                    onChange={() => setFormat('pdf')} 
                                />
                                <span>PDF Download</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="radio" 
                                    name="format" 
                                    value="print" 
                                    checked={format === 'print'} 
                                    onChange={() => setFormat('print')} 
                                />
                                <span>Print</span>
                            </label>
                        </div>
                    </div>
                    
                    <div data-name="print-sections-selector" className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-semibold">Select Sections:</h3>
                            <div className="flex gap-2">
                                <button 
                                    onClick={handleSelectAll} 
                                    className="text-sm text-blue-600 hover:text-blue-800"
                                >
                                    Select All
                                </button>
                                <span className="text-gray-400">|</span>
                                <button 
                                    onClick={handleSelectNone} 
                                    className="text-sm text-blue-600 hover:text-blue-800"
                                >
                                    Select None
                                </button>
                            </div>
                        </div>
                        
                        <div data-name="print-checkbox-list" className="print-checkbox-list">
                            <div className="print-checkbox-item">
                                <input 
                                    type="checkbox" 
                                    id="rules" 
                                    checked={sections.rules} 
                                    onChange={() => handleSectionToggle('rules')} 
                                />
                                <label htmlFor="rules">Game Rules</label>
                            </div>
                            <div className="print-checkbox-item">
                                <input 
                                    type="checkbox" 
                                    id="specialCards" 
                                    checked={sections.specialCards} 
                                    onChange={() => handleSectionToggle('specialCards')} 
                                />
                                <label htmlFor="specialCards">Special Cards</label>
                            </div>
                            <div className="print-checkbox-item">
                                <input 
                                    type="checkbox" 
                                    id="gamePlays" 
                                    checked={sections.gamePlays} 
                                    onChange={() => handleSectionToggle('gamePlays')} 
                                />
                                <label htmlFor="gamePlays">Different Game Plays</label>
                            </div>
                            <div className="print-checkbox-item">
                                <input 
                                    type="checkbox" 
                                    id="gameFlow" 
                                    checked={sections.gameFlow} 
                                    onChange={() => handleSectionToggle('gameFlow')} 
                                />
                                <label htmlFor="gameFlow">Game Flow</label>
                            </div>
                            <div className="print-checkbox-item">
                                <input 
                                    type="checkbox" 
                                    id="simulation" 
                                    checked={sections.simulation} 
                                    onChange={() => handleSectionToggle('simulation')} 
                                />
                                <label htmlFor="simulation">Game Simulation</label>
                            </div>
                        </div>
                    </div>
                    
                    <div data-name="print-preview-container" className="print-preview-container">
                        <h3 className="text-lg font-semibold mb-2">Preview:</h3>
                        <div dangerouslySetInnerHTML={{ __html: previewHtml }}></div>
                    </div>
                    
                    <div data-name="print-modal-buttons" className="print-modal-buttons">
                        <button 
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleExport}
                            disabled={isGenerating || Object.values(sections).every(v => !v)}
                            className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2 ${
                                isGenerating || Object.values(sections).every(v => !v) ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            {isGenerating ? (
                                <>
                                    <i className="fas fa-spinner fa-spin"></i>
                                    <span>Generating...</span>
                                </>
                            ) : format === 'pdf' ? (
                                <>
                                    <i className="fas fa-file-pdf"></i>
                                    <span>Download PDF</span>
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-print"></i>
                                    <span>Print</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('PrintModal component error:', error);
        reportError(error);
        return null;
    }
}
