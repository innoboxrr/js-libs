import { marked } from 'marked';

const sanitize = (string) => {

    if (typeof string !== 'string') {
        
        return '';

    }

    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        "/": '&#x2F;',
    };

    const reg = /[&<>"'/]/ig;

    return string.replace(reg, (match) => (map[match]));
    
}

const removeTags = (string) => {

    if ((string === null) || (string === '')) {

        return '';

    } else {

        string = string.toString();
        
        return string.replace( /(<([^>]+)>)/ig, '');

    }

}

const decodeEntities = (encodedString) => {

  const textarea = document.createElement('textarea');

  textarea.style.display = 'none';

  textarea.innerHTML = encodedString;

  return textarea.value;

}

const replaceWord = (word, object, def = '') => {

    if(object.hasOwnProperty(word)) {

        return object[word];
        
    } else {

        return def;

    }

}

const strlimit = (str, length = 45) => {

    let sufix = (str.length > length) ? '...' : '';

    return str.substring(0, length) + sufix;

}

const slugify = (string, delimiter = '-') => {

  return string.toString()                   // Cast to string
             .toLowerCase()                  // Convert the string to lowercase letters
             .normalize('NFD')               // The normalize() method returns the Unicode Normalization Form of a given string.
             .trim()                         // Remove whitespace from both sides of a string
             .replace(/\s+/g, delimiter)     // Replace spaces with -
             .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
             .replace(/\-\-+/g, delimiter);  // Replace multiple - with single -

}

const uuid = () => { 

    var d = new Date().getTime();//Timestamp
    
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {

        var r = Math.random() * 16;//random number between 0 and 16
        
        if(d > 0){//Use timestamp until depleted
        
            r = (d + r)%16 | 0;
        
            d = Math.floor(d/16);
        
        } else {//Use microseconds since page-load if supported
        
            r = (d2 + r)%16 | 0;
        
            d2 = Math.floor(d2/16);
        
        }
        
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);

    });

}

const randomString = (length = 8) => {

    let result = '';

    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let charactersLength = characters.length;

    for ( let i = 0; i < length; i++ ) {

        result += characters.charAt(Math.floor(Math.random() * charactersLength));

    }

    return result;

}

const stringToArray = (value) => {

    return  JSON.parse(value);

}

const copyStringToClipboard = (str) => {
  return new Promise((resolve, reject) => {
    const textArea = document.createElement('textarea');
    textArea.value = str;
    textArea.style.position = 'fixed';
    textArea.style.opacity = 0;

    document.body.appendChild(textArea);
    textArea.select();

    try {
      document.execCommand('copy');
      resolve();
    } catch (err) {
      reject(err);
    } finally {
      document.body.removeChild(textArea);
    }
  });
};

const firstLetterUppercase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const detectMarkdown = (text) => {
    if (typeof text !== 'string') return false;

    const patterns = [
        /^#{1,6} /m,                        // Encabezados: #, ##, etc.
        /\*\*(.*?)\*\*/s,                  // Negritas con **
        /_(.*?)_/s,                        // Cursivas con _
        /\[(.*?)\]\((.*?)\)/s,            // Enlaces [text](url)
        /!\[(.*?)\]\((.*?)\)/s,           // Imágenes ![alt](url)
        /```[\s\S]*?```/,                 // Bloques de código triple backtick
        /(^|\n)[\-*+] /,                  // Listas no ordenadas
        /^\d+\.\s/m,                      // Listas ordenadas
        /^>\s/m,                          // Citas
        /\|(.+)\|/,                       // Tablas con |
        /---|___|\*\*\*/                 // Separadores horizontales
    ];

    return patterns.some((regex) => regex.test(text));
};

const detectMarkdownConfidence = (text) => {
    if (typeof text !== 'string' || text.trim() === '') return 0;

    const patterns = [
        { name: 'header',        regex: /^#{1,6} /m },                        // # Header
        { name: 'bold',          regex: /\*\*(.*?)\*\*/s },                  // **bold**
        { name: 'italic',        regex: /_(.*?)_/s },                        // _italic_
        { name: 'link',          regex: /\[(.*?)\]\((.*?)\)/s },             // [text](url)
        { name: 'image',         regex: /!\[(.*?)\]\((.*?)\)/s },            // ![alt](img)
        { name: 'codeBlock',     regex: /```[\s\S]*?```/ },                  // ``` code ```
        { name: 'inlineCode',    regex: /`[^`\n]+`/ },                       // `code`
        { name: 'ulList',        regex: /(^|\n)[\-*+] / },                   // - item
        { name: 'olList',        regex: /^\d+\.\s/m },                       // 1. item
        { name: 'blockquote',    regex: /^>\s/m },                           // > quote
        { name: 'table',         regex: /\|(.+)\|/ },                        // | table |
        { name: 'hr',            regex: /(^|\n)(---|\*\*\*|___)(\n|$)/ },    // --- separator
    ];

    const totalPatterns = patterns.length;
    let matchCount = 0;

    patterns.forEach(({ regex }) => {
        if (regex.test(text)) matchCount++;
    });

    const confidence = matchCount / totalPatterns;

    return parseFloat(confidence.toFixed(2)); // Valor entre 0 y 1, con 2 decimales
};


import { marked } from 'marked';

const markdownToHtml = (markdown) => {
    if (typeof markdown !== 'string') return '';

    const cleaned = markdown
        .replace(/\\n/g, '\n')
        .replace(/\\"/g, '"')
        .replace(/\\'/g, "'");

    marked.use({
        renderer: {
            code(code, infostring, escaped) {
                const lang = (infostring || 'plaintext').trim();
                return `<pre class="language-${lang}"><code>${escapeHtml(code)}</code></pre>`;
            }
        }
    });

    return marked.parse(cleaned);
};

// Escapar HTML dentro del bloque <code>
const escapeHtml = (unsafe) => {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
};


export {
    sanitize,
    removeTags,
    decodeEntities,
    replaceWord,
    strlimit,
    slugify,
    uuid,
    randomString,
    stringToArray,
    copyStringToClipboard,
    markdownToHtml,
    firstLetterUppercase,
    detectMarkdown,
    detectMarkdownConfidence,
    escapeHtml
}