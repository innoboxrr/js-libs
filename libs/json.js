/* Convierte un String a formato JSON */
const jsonParser = (json_string) => {

    let json = json_string.replace(/(\r\n|\n|\r)/gm,"")
                          .replace(/\\n/g, "\\n")  
                          .replace(/\\'/g, "\\'")
                          .replace(/\\"/g, '\\"')
                          .replace(/\\&/g, "\\&")
                          .replace(/\\r/g, "\\r")
                          .replace(/\\t/g, "\\t")
                          .replace(/\\b/g, "\\b")
                          .replace(/\\f/g, "\\f");

    // remove non-printable and other non-valid JSON chars
    json = json.replace(/[\u0000-\u0019]+/g,""); 

    json = JSON.parse(json);

    return json;
}
    
// Generalmente se ocupa para las operaciones con metainformación
const getValue = (obj, key_column, key_value, value_column = 'value', default_value = '') =>  {

    var result = '';
    var search = search(obj, key_column, key_value);

    if (search.length >= 1) {
        var first = search[0];
        result = first[value_column];
    }

    if(result == '') {
        result = default_value;
    }

    return result;
}

function search(obj = [], key_column, key_value)
{
    var results = [];
    var key_column = key_column;
    var key_value = key_value;

    for (var i=0 ; i < obj.length ; i++)
    {
        if (obj[i][key_column] == key_value) {
            results.push(obj[i]);
        }
    }

    return results; 
}



export {
    jsonParser,
    getValue
}