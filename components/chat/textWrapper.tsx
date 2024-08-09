/**
 * Formats unstructured text into a more readable format.
 * @param {string} text - The unstructured text from the LLM.
 * @returns {string} - The formatted HTML string.
 */
export default function formatText(text: string): string {
    // Replace newline characters with <br> for HTML line breaks
    text = text.replace(/\n/g, '<br>');

    // Replace Markdown-like bold syntax with HTML <strong> tags
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Replace Markdown-like italic syntax with HTML <em> tags
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Replace Markdown-like bullet points with HTML <ul> and <li> tags
    text = text.replace(/- (.*?)<br>/g, '<li>$1</li>');
    text = text.replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>');

    return text;
}

