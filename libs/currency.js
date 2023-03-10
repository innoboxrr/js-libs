const currencyRates = () => {

    return new Promise(function(resolve, reject) {

        fetch('https://exchange.api.itec.systems/api/rates').then(response => response.json()).then(data => {
            
            let currency = {
                'MXN': 1,
                'EUR': data['EUR'],
                'USD': data['USD'],
            }  

            resolve(currency);   

        });

    });        

}

const currencySymbols = () => {

    return {
        "CAD": "$",
        "HKD": "$",
        "ISK": "kr",
        "PHP": "₱",
        "DKK": "kr",
        "HUF": "Ft",
        "CZK": "Kč",
        "GBP": "£",
        "RON": "kr",
        "SEK": "kr",
        "IDR": "Rp",
        "INR": "₹",
        "BRL": "R$",
        "RUB": "₽",
        "HRK": "kn",
        "JPY": "¥",
        "THB": "฿",
        "CHF": "CHF",
        "EUR": "€",
        "MYR": "RM",
        "BGN": "лв",
        "TRY": "TL",
        "CNY": "¥",
        "NOK": "kr",
        "NZD": "$",
        "ZAR": "R",
        "USD": "$",
        "MXN": "$",
        "SGD": "$",
        "AUD": "$",
        "ILS": "₪",
        "KRW": "₩",
        "PLN": "zł"
    }
    
}

export {
    currencyRates,
    currencySymbols
}