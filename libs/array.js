import { escapeHtml } from './string.js'

/**
 * Baraja una copia del array.
 *
 * `array.sort(() => Math.random() - 0.5)` es un barajado sesgado —el
 * comparador no es consistente, y el resultado depende del algoritmo de
 * ordenación— y además mutaba el array de quien llamaba. Esto es
 * Fisher-Yates, que reparte uniforme.
 *
 * @template T
 * @param {T[]} array
 * @returns {T[]}
 */
const shuffleArray = (array) => {
	const shuffled = [...(array ?? [])]

	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));

		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
	}

	return shuffled
}

/**
 * De una lista de valores a la forma {id, name} que esperan los selects.
 *
 * @param {Array<string|number>} options
 * @returns {Array<{id: string|number, name: string|number}>}
 */
const optionsKeyPair = (options) => (options ?? []).map((option) => ({ id: option, name: option }))

/**
 * Una lista HTML a partir de un array.
 *
 * Tenía dos fallos: el `for (i = 0; ...)` no declaraba `i`, y como un módulo
 * ESM siempre corre en modo estricto, la función lanzaba un ReferenceError
 * cada vez que se llamaba. Y no escapaba nada, así que un valor con `<` metía
 * marcado en la página.
 *
 * @param {Array<string|number>} array
 * @param {string} [type]
 * @returns {string}
 */
const arrayToHtmlList = (array, type = 'ul') => {
	const items = (array ?? []).map((item) => `<li>${escapeHtml(String(item))}</li>`).join('')

	return `<${type}>${items}</${type}>`
}

export {
	shuffleArray,
	optionsKeyPair,
	arrayToHtmlList
};
