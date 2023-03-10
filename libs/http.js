/**
 * Redirecciona al usuario mediante javascript
 * @param  {string} url URL de redireccionamiento
 * @return {bool} 
 */
const redirect = (url) => {

    window.location.href = url;

    return false;
}

const urlParser = (url) => {

    if(urlValidator(url)){
        var parser = document.createElement('a'),
            searchObject = {},
            queries, split, i;

        // Let the browser do the work
        parser.href = url;

        // Convert query string to object
        queries = parser.search.replace(/^\?/, '').split('&');

        for( i = 0; i < queries.length; i++ ) {
            split = queries[i].split('=');
            searchObject[split[0]] = split[1];
        }

        return {
            protocol: parser.protocol,
            host: parser.host,
            hostname: parser.hostname,
            port: parser.port,
            pathname: parser.pathname,
            search: parser.search,
            searchObject: searchObject,
            hash: parser.hash
        };
    }else{
        return {
            protocol: null,
            host: null,
            hostname: null,
            port: null,
            pathname: null,
            search: null,
            searchObject: null,
            hash: null
        }
    }
}

const convertUrlToHttps = (url) => {

    url = new URL(url);

    if (url.protocol !== 'https:') {

        // La URL no es HTTPS, así que podemos cambiarla a HTTPS
        url.protocol = 'https:';

    }

    return url.href;

}

const urlValidator = (url) => {

  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
                    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
                    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
                    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
                    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
                    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  
  return !!pattern.test(url);
}

const splitHostname = (host) => { 

    let result = host.split('.');

    return result; 
}  

const addParameterToUrl = (url, param) => {

    url += (url.split('?')[1] ? '&':'?') + param;
    
    return url;
}

/**
 * 
 * DEPRECADO, emplear embed.js en su lugar
 * 
 * Retorna la URL de embed para:
 *  - YouTube
 *  - Vimeo
 * Pendientes:
 *  - Google Slides
 *  - etc.
 */
const getEmbedUrl = (url) => {

    console.warn('Esté método está deprecado, use embed.js en su lugar');

    let parsed_url = urlParser(url);

    let result = url;

    let youtube_base = 'https://www.youtube.com/embed/';

    let vimeo_base = 'https://player.vimeo.com/video/';

    // Validador para Youtube
    if(parsed_url.hostname == 'www.youtube.com' || parsed_url.hostname == 'youtube.com' || parsed_url.hostname == 'youtu.be'){

        if(parsed_url.hostname == 'www.youtube.com' || parsed_url.hostname == 'youtube.com'){

            // EMBED MATCH

                let embed_pattern = new RegExp('(\/embed)');

                let embed_match = embed_pattern.test(parsed_url.pathname);

                if(embed_match){

                    let id = parsed_url.pathname.slice(7);

                    result = youtube_base + id;

                }

            // WATCH MATCH

                let watch_pattern = new RegExp('(\/watch)');

                let watch_match = watch_pattern.test(parsed_url.pathname);

                if(watch_match){

                    if(parsed_url.searchObject.v){
                        
                        let id = parsed_url.searchObject.v;

                        result = youtube_base + id;
                    }

                }

        }   

        if(parsed_url.hostname == 'youtu.be'){

            // En este punto el id se encuntra en el pathname
            let id = parsed_url.pathname.slice(1);

            result = youtube_base + id;

        }

    }

    if(parsed_url.hostname == 'www.vimeo.com' || parsed_url.hostname == 'vimeo.com' || parsed_url == 'player.vimeo.com'){

        if(parsed_url.hostname == 'www.vimeo.com' || parsed_url.hostname == 'vimeo.com'){

            // En este punto el id se encuntra en el pathname
            let id = parsed_url.pathname.slice(1);

            result = vimeo_base + id;

        }   

        if(parsed_url == 'player.vimeo.com'){

            // En este punto el id se encuntra en el pathname
            let id = parsed_url.pathname.slice(7);

            result = vimeo_base + id;

        } 

    }

    return result;
}

const isImageLink = (url) => {

    if (typeof url !== 'string' || !urlValidator(url)) {
    
      return false;
    
    }
    
    return (url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi) !== null);

}

const isPdfLink = (url) => {

    if (typeof url !== 'string' || !urlValidator(url)) {
    
      return false;
    
    }
    
    return (url.match(/^http[^\?]*.(pdf)(\?(.*))?$/gmi) !== null);

}

const isVideoLink = (url) => {

    if (typeof url !== 'string' || !urlValidator(url)) {
    
      return false;
    
    }
    
    return (url.match(/^http[^\?]*.(mp4|mov|mpeg|avi)(\?(.*))?$/gmi) !== null);

}

const isAudioLink = (url) => {

    if (typeof url !== 'string' || !urlValidator(url)) {
    
      return false;
    
    }
    
    return (url.match(/^http[^\?]*.(mp3|wav|m4a)(\?(.*))?$/gmi) !== null);

}

export {
    redirect,
    urlParser,
    convertUrlToHttps,
    urlValidator,
    splitHostname,
    addParameterToUrl,
    getEmbedUrl,
    isImageLink,
    isPdfLink,
    isVideoLink,
    isAudioLink,
}