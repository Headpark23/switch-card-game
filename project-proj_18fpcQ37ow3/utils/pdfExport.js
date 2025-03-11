// Function to generate print-friendly content
async function generatePrintContent(sections) {
    try {
        // Create a new document with proper styling
        const content = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Switch Card Game Rules</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        margin: 0;
                        padding: 20px;
                    }
                    
                    h1 {
                        text-align: center;
                        color: #2563eb;
                        margin-bottom: 20px;
                    }
                    
                    h2 {
                        color: #1d4ed8;
                        border-bottom: 1px solid #ddd;
                        padding-bottom: 5px;
                        margin-top: 20px;
                    }
                    
                    h3 {
                        color: #1e40af;
                    }
                    
                    .section {
                        margin-bottom: 30px;
                        page-break-inside: avoid;
                    }
                    
                    .rule-card {
                        border: 1px solid #ddd;
                        border-radius: 5px;
                        padding: 15px;
                        margin-bottom: 15px;
                        background-color: #f9fafb;
                    }
                    
                    .rule-title {
                        font-weight: bold;
                        margin-bottom: 10px;
                    }
                    
                    ul {
                        padding-left: 20px;
                    }
                    
                    li {
                        margin-bottom: 5px;
                    }
                    
                    .special-cards {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 15px;
                    }
                    
                    .special-card {
                        border: 1px solid #ddd;
                        border-radius: 5px;
                        padding: 10px;
                        width: calc(50% - 15px);
                        background-color: #f9fafb;
                    }
                    
                    .special-card h4 {
                        margin-top: 0;
                        text-align: center;
                    }
                    
                    .footer {
                        margin-top: 30px;
                        text-align: center;
                        font-size: 12px;
                        color: #666;
                        border-top: 1px solid #ddd;
                        padding-top: 10px;
                    }
                    
                    .qr-code {
                        float: right;
                        width: 100px;
                        height: 100px;
                        margin-left: 15px;
                    }
                </style>
            </head>
            <body>
                <div class="qr-code">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(window.location.href)}" alt="QR Code to Switch Card Game Rules" />
                </div>
                
                <h1>Switch Card Game Rules</h1>
                
                ${sections.rules ? `
                <div class="section">
                    <h2>Game Rules</h2>
                    <div class="rules-container">
                        ${gameRules.map(rule => `
                            <div class="rule-card">
                                <div class="rule-title">${rule.title}</div>
                                <ul>
                                    ${rule.content.map(item => `<li>${item}</li>`).join('')}
                                </ul>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
                
                ${sections.specialCards ? `
                <div class="section">
                    <h2>Special Cards</h2>
                    <div class="special-cards">
                        <div class="special-card">
                            <h4>Black Kings</h4>
                            <ul>
                                <li>Next player must pick up 5 cards</li>
                                <li>Two black kings played = pick up 10 cards</li>
                            </ul>
                        </div>
                        <div class="special-card">
                            <h4>Red Kings</h4>
                            <ul>
                                <li>Cancels the effect of black kings</li>
                                <li>Need one red king for each black king played</li>
                            </ul>
                        </div>
                        <div class="special-card">
                            <h4>Two of Any Suit</h4>
                            <ul>
                                <li>Next player picks up 2 cards</li>
                                <li>Can be chained with another two</li>
                                <li>Each two adds 2 cards to pick up</li>
                            </ul>
                        </div>
                        <div class="special-card">
                            <h4>Eight of Any Suit</h4>
                            <ul>
                                <li>Next player misses their turn</li>
                                <li>Can be countered with another eight</li>
                                <li>Effect passes to next player</li>
                            </ul>
                        </div>
                        <div class="special-card">
                            <h4>Seven of Any Suit</h4>
                            <ul>
                                <li>Play again</li>
                                <li>Cannot be used as your last card</li>
                            </ul>
                        </div>
                        <div class="special-card">
                            <h4>Jack of Any Suit</h4>
                            <ul>
                                <li>Reverses play direction</li>
                                <li>1 or 3 jacks = reverse direction</li>
                                <li>2 or 4 jacks = original direction</li>
                            </ul>
                        </div>
                        <div class="special-card">
                            <h4>Ace of Any Suit</h4>
                            <ul>
                                <li>Change the current suit to any suit</li>
                                <li>Can be played on any card except: Black Kings, Two's or Eight's</li>
                            </ul>
                        </div>
                    </div>
                </div>
                ` : ''}
                
                ${sections.gamePlays ? `
                <div class="section">
                    <h2>Different Game Plays</h2>
                    <div class="rules-container">
                        ${gamePlays.map(play => `
                            <div class="rule-card">
                                <div class="rule-title">${play.title}</div>
                                <ul>
                                    ${play.content.map(item => `<li>${item}</li>`).join('')}
                                </ul>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
                
                ${sections.gameFlow ? `
                <div class="section">
                    <h2>Game Flow</h2>
                    <ol>
                        <li>Deal 7 cards to each player</li>
                        <li>Dealer turns over the top card to start</li>
                        <li>Players match suit or number of the previous card, or play special cards</li>
                        <li>Shout "Last Card" when you have one card remaining</li>
                        <li>First player to play all cards wins</li>
                    </ol>
                </div>
                ` : ''}
                
                ${sections.simulation ? `
                <div class="section">
                    <h2>Game Simulation</h2>
                    <p>For an interactive simulation of the game, please visit our website.</p>
                </div>
                ` : ''}
                
                <div class="footer">
                    <p>© ${new Date().getFullYear()} Switch Card Game Rules</p>
                    <p>For the latest rules and interactive demonstrations, scan the QR code or visit our website.</p>
                </div>
            </body>
            </html>
        `;
        
        return content;
    } catch (error) {
        console.error('Error generating print content:', error);
        reportError(error);
        throw error;
    }
}

// Function to generate and download PDF
async function generatePDF(sections) {
    try {
        // Create a temporary container for the PDF content
        const tempContainer = document.createElement('div');
        tempContainer.style.position = 'absolute';
        tempContainer.style.left = '-9999px';
        tempContainer.style.top = '0';
        tempContainer.style.width = '800px'; // Fixed width for PDF
        document.body.appendChild(tempContainer);
        
        // Create content structure based on selected sections
        let content = `
            <div style="padding: 20px; font-family: Arial, sans-serif;">
                <h1 style="text-align: center; color: #2563eb; margin-bottom: 20px;">Switch Card Game Rules</h1>
        `;
        
        // Add QR code
        content += `
            <div style="float: right; width: 100px; height: 100px; margin-left: 15px;">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(window.location.href)}" 
                    alt="QR Code" style="width: 100%; height: 100%;" />
            </div>
        `;
        
        // Add selected sections
        if (sections.rules) {
            content += `
                <div style="margin-bottom: 30px;">
                    <h2 style="color: #1d4ed8; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Game Rules</h2>
                    ${gameRules.map(rule => `
                        <div style="border: 1px solid #ddd; border-radius: 5px; padding: 15px; margin-bottom: 15px; background-color: #f9fafb;">
                            <div style="font-weight: bold; margin-bottom: 10px;">${rule.title}</div>
                            <ul style="padding-left: 20px;">
                                ${rule.content.map(item => `<li style="margin-bottom: 5px;">${item.replace(/<span[^>]*>/g, '').replace(/<\/span>/g, '')}</li>`).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>
            `;
        }
        
        if (sections.specialCards) {
            content += `
                <div style="margin-bottom: 30px; page-break-before: always;">
                    <h2 style="color: #1d4ed8; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Special Cards</h2>
                    <div style="display: flex; flex-wrap: wrap; gap: 15px;">
                        <div style="border: 1px solid #ddd; border-radius: 5px; padding: 10px; width: 45%; background-color: #f9fafb;">
                            <h4 style="margin-top: 0; text-align: center;">Black Kings</h4>
                            <ul>
                                <li>Next player must pick up 5 cards</li>
                                <li>Two black kings played = pick up 10 cards</li>
                            </ul>
                        </div>
                        <div style="border: 1px solid #ddd; border-radius: 5px; padding: 10px; width: 45%; background-color: #f9fafb;">
                            <h4 style="margin-top: 0; text-align: center;">Red Kings</h4>
                            <ul>
                                <li>Cancels the effect of black kings</li>
                                <li>Need one red king for each black king played</li>
                                <li>Two black kings require two red kings to cancel</li>
                            </ul>
                        </div>
                        <div style="border: 1px solid #ddd; border-radius: 5px; padding: 10px; width: 45%; background-color: #f9fafb;">
                            <h4 style="margin-top: 0; text-align: center;">Two of Any Suit</h4>
                            <ul>
                                <li>Next player picks up 2 cards</li>
                                <li>Can be chained with another two</li>
                                <li>Each two adds 2 cards to pick up</li>
                                <li>Maximum of 8 cards (4 twos played)</li>
                            </ul>
                        </div>
                        <div style="border: 1px solid #ddd; border-radius: 5px; padding: 10px; width: 45%; background-color: #f9fafb;">
                            <h4 style="margin-top: 0; text-align: center;">Eight of Any Suit</h4>
                            <ul>
                                <li>Next player misses their turn</li>
                                <li>Can be countered with another eight</li>
                                <li>Effect passes to next player</li>
                            </ul>
                        </div>
                        <div style="border: 1px solid #ddd; border-radius: 5px; padding: 10px; width: 45%; background-color: #f9fafb;">
                            <h4 style="margin-top: 0; text-align: center;">Seven of Any Suit</h4>
                            <ul>
                                <li>Play again</li>
                                <li>Cannot be used as your last card</li>
                                <li>Would require you to play again</li>
                            </ul>
                        </div>
                        <div style="border: 1px solid #ddd; border-radius: 5px; padding: 10px; width: 45%; background-color: #f9fafb;">
                            <h4 style="margin-top: 0; text-align: center;">Jack of Any Suit</h4>
                            <ul>
                                <li>Reverses play direction</li>
                                <li>1 or 3 jacks = reverse direction</li>
                                <li>2 or 4 jacks = original direction</li>
                                <li>Cannot be last card in 2-player games</li>
                            </ul>
                        </div>
                        <div style="border: 1px solid #ddd; border-radius: 5px; padding: 10px; width: 45%; background-color: #f9fafb;">
                            <h4 style="margin-top: 0; text-align: center;">Ace of Any Suit</h4>
                            <ul>
                                <li>Change the current suit to any suit</li>
                                <li>Can be played on any card except: Black Kings, Two's or Eight's</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `;
        }
        
        if (sections.gamePlays) {
            content += `
                <div style="margin-bottom: 30px; page-break-before: always;">
                    <h2 style="color: #1d4ed8; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Different Game Plays</h2>
                    ${gamePlays.map(play => `
                        <div style="border: 1px solid #ddd; border-radius: 5px; padding: 15px; margin-bottom: 15px; background-color: #f9fafb;">
                            <div style="font-weight: bold; margin-bottom: 10px;">${play.title}</div>
                            <ul style="padding-left: 20px;">
                                ${play.content.map(item => `<li style="margin-bottom: 5px;">${item}</li>`).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>
            `;
        }
        
        if (sections.gameFlow) {
            content += `
                <div style="margin-bottom: 30px; ${sections.gamePlays ? '' : 'page-break-before: always;'}">
                    <h2 style="color: #1d4ed8; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Game Flow</h2>
                    <ol style="padding-left: 20px;">
                        <li style="margin-bottom: 10px;">Deal 7 cards to each player</li>
                        <li style="margin-bottom: 10px;">Dealer turns over the top card to start</li>
                        <li style="margin-bottom: 10px;">Players match suit or number of the previous card, or play special cards</li>
                        <li style="margin-bottom: 10px;">Shout "Last Card" when you have one card remaining</li>
                        <li style="margin-bottom: 10px;">First player to play all cards wins</li>
                    </ol>
                </div>
            `;
        }
        
        if (sections.simulation) {
            content += `
                <div style="margin-bottom: 30px;">
                    <h2 style="color: #1d4ed8; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Game Simulation</h2>
                    <p>For an interactive simulation of the game, please visit our website or scan the QR code.</p>
                </div>
            `;
        }
        
        // Add footer
        content += `
                <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #ddd; padding-top: 10px;">
                    <p>© ${new Date().getFullYear()} Switch Card Game Rules</p>
                    <p>For the latest rules and interactive demonstrations, scan the QR code or visit our website.</p>
                </div>
            </div>
        `;
        
        tempContainer.innerHTML = content;
        
        // Wait for images to load
        await new Promise(resolve => {
            const images = tempContainer.querySelectorAll('img');
            let loadedCount = 0;
            
            if (images.length === 0) {
                resolve();
                return;
            }
            
            images.forEach(img => {
                if (img.complete) {
                    loadedCount++;
                    if (loadedCount === images.length) resolve();
                } else {
                    img.onload = () => {
                        loadedCount++;
                        if (loadedCount === images.length) resolve();
                    };
                    img.onerror = () => {
                        loadedCount++;
                        if (loadedCount === images.length) resolve();
                    };
                }
            });
        });
        
        // Use html2canvas to create an image of the content
        const canvas = await html2canvas(tempContainer, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            logging: false
        });
        
        // Create PDF
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });
        
        // Calculate dimensions
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 295; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;
        
        // Add image to PDF, creating new pages as needed
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        
        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
        
        // Save the PDF
        pdf.save('Switch_Card_Game_Rules.pdf');
        
        // Clean up
        document.body.removeChild(tempContainer);
        
    } catch (error) {
        console.error('Error generating PDF:', error);
        reportError(error);
        throw error;
    }
}
