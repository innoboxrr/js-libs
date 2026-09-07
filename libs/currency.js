/**
 * El endpoint de tipos de cambio.
 *
 * Estaba escrito dentro de la función. Sacarlo permite apuntarlo a otro sitio
 * —o a un mock en una prueba— sin tocar el código.
 */
export const RATES_ENDPOINT = 'https://exchange.api.itec.systems/api/rates'

/**
 * Tipos de cambio con MXN como base.
 *
 * Devolvía una promesa que **nunca se rechazaba**: no había `catch` y el
 * parámetro `reject` no se usaba, así que un fallo de red dejaba la promesa
 * pendiente para siempre y quien la esperara se quedaba colgado.
 *
 * @param {{endpoint?: string, signal?: AbortSignal}} [options]
 * @returns {Promise<Record<string, number>>}
 */
const currencyRates = async (options = {}) => {
    const response = await fetch(options.endpoint ?? RATES_ENDPOINT, { signal: options.signal })

    if (! response.ok) {
        throw new Error(`No se pudieron obtener los tipos de cambio (HTTP ${response.status}).`)
    }

    const data = await response.json()

    return {
        MXN: 1,
        EUR: data.EUR,
        USD: data.USD,
    }
}

/**
 * @returns {Record<string, string>}
 */
const currencySymbols = () => ({
    AUD: '$',
    BGN: 'лв',
    BRL: 'R$',
    CAD: '$',
    CHF: 'CHF',
    CNY: '¥',
    CZK: 'Kč',
    DKK: 'kr',
    EUR: '€',
    GBP: '£',
    HKD: '$',
    HRK: 'kn',
    HUF: 'Ft',
    IDR: 'Rp',
    ILS: '₪',
    INR: '₹',
    ISK: 'kr',
    JPY: '¥',
    KRW: '₩',
    MXN: '$',
    MYR: 'RM',
    NOK: 'kr',
    NZD: '$',
    PHP: '₱',
    PLN: 'zł',
    RON: 'lei',
    RUB: '₽',
    SEK: 'kr',
    SGD: '$',
    THB: '฿',
    TRY: '₺',
    USD: '$',
    ZAR: 'R',
})

export {
    currencyRates,
    currencySymbols
}
