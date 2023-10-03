const pdf2html = require('pdf2html');

const pdfFilePath = 'resume.pdf';  // Replace with your PDF file path
const outputHtmlFilePath = 'output.html';  // Replace with your desired output HTML file path

pdf2html.html(pdfFilePath, outputHtmlFilePath, (err) => {
    if (err) {
        console.error('Error converting PDF to HTML:', err);
    } else {
        console.log('PDF converted to HTML successfully:', outputHtmlFilePath);
    }
});
