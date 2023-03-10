/*
    
    Módulo provicional para recuperar la geolocalización del usuario

    Modelo base requerido:

        {
            ip,
            country,
            countryCode,
            region,
            regionCode,
            city,
            continentCode,
            continentName,
            timezone,
            currencyCode,
            currencySymbol,
        }  
    
*/

const getGeoLocation = () => {

    return new Promise((resolve, reject) => {

        // Iterar sobre cada URL hasta obtener una petición con status 200
        fetchIpInfo().then( res => {

            resolve(res);

            return;

        }).catch( error => {

            fetchDbIp().then( res => {

                resolve(res)

                return;

            }).catch( error => {

                fetchIpApi().then( res => {

                    resolve(res)

                    return;

                }).catch( error => {

                    reject({status: false});

                });

            });

        });

    });        

}

// https://ipinfo.io/json
const fetchIpInfo = () => {

    return new Promise((resolve, reject) => {

        fetch('https://ipinfo.io/json').then(response => {

            if(!response.ok) reject({});

            return response.json();

        }).then(data => {
            
            data = {
                ip: data.ip,
                country: data.region,
                countryCode: data.country,
                region: data.region,
                regionCode: '',
                city: data.city,
                continentCode: '',
                continentName: '',
                timezone: data.timezone,
                currencyCode: '',
                currencySymbol: ''
            }  

            resolve(data);   

        }).catch(error => reject(error));

    });

}

// https://api.db-ip.com/v2/free/self
const fetchDbIp = () => {

    return new Promise((resolve, reject) => {

        fetch('https://api.db-ip.com/v2/free/self').then(response => {

            if(!response.ok) reject({});

            return response.json();

        }).then(data => {
            
            data = {
                ip: data.ipAddress,
                country: data.countryName,
                countryCode: data.countryCode,
                region: '',
                regionCode: '',
                city: data.city,
                continentCode: data.continentCode,
                continentName: data.continentName,
                timezone: '',
                currencyCode: '',
                currencySymbol: ''
            }  

            resolve(data);   

        }).catch(error => reject(error));

    });

}

// https://ipapi.co/json/
const fetchIpApi = () => {

    return new Promise((resolve, reject) => {

        fetch('https://ipapi.co/json').then(response => {

            if(!response.ok) reject({});

            return response.json();

        }).then(data => {
            
            data = {
                ip: data.ip,
                country: data.country_name,
                countryCode: data.country_code,
                region: data.region,
                regionCode: data.region_code,
                city: data.city,
                continentCode: data.continent_code,
                continentName: '',
                timezone: data.timezone,
                currencyCode: data.currency,
                currencySymbol: data.currency_name
            }  

            resolve(data);   

        }).catch(error => reject(error));

    });

}


export {
    getGeoLocation
}