/**
 * Formatea una cantidad con separador de miles.
 *
 * Quitaba todo lo que no fuera digito o punto —incluido el signo menos—, asi
 * que numberFormat(-1500) devolvia '1,500': un adeudo se mostraba como un
 * saldo a favor.
 *
 * @param {number|string} amount
 * @param {number} [decimals]
 * @returns {string}
 */
const numberFormat = (amount, decimals = 0) => {
    const clean = String(amount ?? '').replace(/[^0-9.\-]/g, '')
    const value = parseFloat(clean)

    if (isNaN(value) || value === 0) {
        return (0).toFixed(decimals)
    }

    const [whole, fraction] = Math.abs(value).toFixed(decimals).split('.')
    const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    const sign = value < 0 ? '-' : ''

    return sign + (fraction === undefined ? grouped : `${grouped}.${fraction}`)
}

/**
 * @param {number} number
 * @returns {string}
 */
const decimalToHexString = (number) => {
    const value = number < 0 ? 0xFFFFFFFF + number + 1 : number

    return value.toString(16).toUpperCase()
}

/**
 * Rellena con ceros a la izquierda hasta `width` digitos.
 *
 * El signo no cuenta como digito: zfill(-5, 3) es '-005', no '-05'. La version
 * anterior medía la longitud sobre la cadena con signo.
 *
 * @param {number} number
 * @param {number} width
 * @returns {string}
 */
const zfill = (number, width) => {
    const digits = String(Math.abs(number))
    const sign = number < 0 ? '-' : ''

    return sign + digits.padStart(width, '0')
}

export {
    numberFormat,
    decimalToHexString,
    zfill
};
