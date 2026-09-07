/**
 * Parsea una cadena a JSON, tolerando los saltos de línea y los caracteres de
 * control que a veces trae un campo de texto.
 *
 * @param {string} json_string
 * @returns {any}
 */
const jsonParser = (json_string) => {
    const json = String(json_string ?? '')
        .replace(/(\r\n|\n|\r)/gm, '')
        // Los caracteres de control no son JSON válido.
        .replace(/[\u0000-\u001F]+/g, '')

    return JSON.parse(json)
}

/**
 * Las filas cuya columna `key_column` vale `key_value`.
 *
 * @param {Array<Record<string, any>>} rows
 * @param {string} key_column
 * @param {any} key_value
 * @returns {Array<Record<string, any>>}
 */
const search = (rows = [], key_column, key_value) => (
    (rows ?? []).filter((row) => row?.[key_column] == key_value)
)

/**
 * El valor de la primera fila que coincida.
 *
 * Hacía `var search = search(obj, ...)`: la declaración con `var` sombrea a la
 * función dentro de este ámbito, así que en el momento de la llamada `search`
 * valía `undefined` y esto lanzaba un TypeError. La función no ha funcionado
 * nunca, pese a ser la que usa el ecosistema para leer metainformación.
 *
 * @param {Array<Record<string, any>>} rows
 * @param {string} key_column
 * @param {any} key_value
 * @param {string} [value_column]
 * @param {any} [default_value]
 * @returns {any}
 */
const getValue = (rows, key_column, key_value, value_column = 'value', default_value = '') => {
    const [first] = search(rows, key_column, key_value)

    const result = first?.[value_column]

    return (result === undefined || result === null || result === '') ? default_value : result
}

export {
    jsonParser,
    getValue,
    search
};
