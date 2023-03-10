import { urlParser } from '@js/utils/http'

const getEmbedUrl = (url) => {

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

export {

    getEmbedUrl

}