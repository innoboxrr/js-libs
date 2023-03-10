const sanitize = (string) => {

    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        "/": '&#x2F;',
    };

    const reg = /[&<>"'/]/ig;

    return string.replace(reg, (match)=>(map[match]));

}

const removeTags = (string) => {

    if ((string === null) || (string === '')) {

        return '';

    } else {

        string = string.toString();
        
        return string.replace( /(<([^>]+)>)/ig, '');

    }

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

        navigator.clipboard.writeText(str).then(res => {
        
            resolve(res);
        
        }, error => {
        
            reject(error);
        
        });

    });

}

export {
    sanitize,
    removeTags,
    replaceWord,
    strlimit,
    slugify,
    uuid,
    randomString,
    stringToArray,
    copyStringToClipboard,
}