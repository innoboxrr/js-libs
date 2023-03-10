const numberFormat = (amount, decimals) => {

    amount = '' + amount; // por si pasan un numero en vez de un string
                      
    amount = parseFloat(amount.replace(/[^0-9\.]/g, '')); // elimino cualquier cosa que no sea numero o punto

    decimals = decimals || 0; // por si la variable no fue fue pasada

    // si no es un numero o es igual a cero retorno el mismo cero
    if (isNaN(amount) || amount === 0) 
        return parseFloat(0).toFixed(decimals);

    // si es mayor o menor que cero retorno el valor formateado como numero
    amount = '' + amount.toFixed(decimals);

    let amount_parts = amount.split('.');

    let regexp = /(\d+)(\d{3})/;

    while (regexp.test(amount_parts[0])) amount_parts[0] = amount_parts[0].replace(regexp, '$1' + ',' + '$2');

    return amount_parts.join('.');

}

const decimalToHexString = (number) => {

    if (number < 0) {

        number = 0xFFFFFFFF + number + 1;

    }

    return number.toString(16).toUpperCase();

}

const zfill = (number, width) => {

    let numberOutput = Math.abs(number); /* Valor absoluto del número */
    
    let length = number.toString().length; /* Largo del número */ 
    
    let zero = "0"; /* String de cero */  
    
    if (width <= length) {

        if (number < 0) {

             return ("-" + numberOutput.toString()); 

        } else {

             return numberOutput.toString(); 

        }

    } else {

        if (number < 0) {

            return ("-" + (zero.repeat(width - length)) + numberOutput.toString()); 

        } else {

            return ((zero.repeat(width - length)) + numberOutput.toString()); 

        }

    }
}

export {
    numberFormat,
    decimalToHexString,
    zfill
};