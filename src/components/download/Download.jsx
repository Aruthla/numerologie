import './download.scss';
import React from 'react';
import jsPDF from 'jspdf';

class DownloadPageButton extends React.Component {
    handleDownloadClick = () => {
        // Create a new jsPDF instance
        const doc = new jsPDF();

        // Capture the active page's content (you can adjust the selector as needed)
        const activePageContent = document.body;

        // Create a link element to add the CSS stylesheet for styling the PDF
        const scssLink = document.createElement('link');
        scssLink.href = './pdf-styles.scss';
        scssLink.rel = 'stylesheet';

        // Append the CSS link to the document temporarily
        document.head.appendChild(scssLink);

        // Convert the active page's content to a PDF
        doc.html(activePageContent, {
            callback: function (pdf) {
                // Save the PDF with a specified filename
                pdf.save('page_content.pdf');

                // Remove the CSS link after the PDF is generated
                document.head.removeChild(scssLink);
            },
        });
    };

    render() {
        return (
            <div className='DivDownload'>
                <h1>Télécharger la page</h1>
                <p>Vous pouvez télécharger la page active en PDF</p>
                <button onClick={this.handleDownloadClick}>
                    <p>Télécharger la page en PDF</p>
                </button>
            </div>
        );
    }
}

export default DownloadPageButton;
