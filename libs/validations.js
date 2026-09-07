/**
 * @param {string} email
 * @returns {boolean}
 */
const emailValidation = (email) => (
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        .test(String(email ?? ''))
)

/**
 * La expresion no estaba anclada, asi que 'esto no es una url http://x' daba
 * true: cualquier texto que contuviera algo parecido a una URL pasaba.
 *
 * @param {string} url
 * @returns {boolean}
 */
const urlValidation = (url) => (
    /^(https?|s?ftp):\/\/[^\s/$.?#][^\s]*$/i.test(String(url ?? '').trim())
)

export {
	emailValidation,
	urlValidation
}
