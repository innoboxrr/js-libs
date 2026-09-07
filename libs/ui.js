/**
 * Cierra un dropdown de UIkit.
 *
 * UIkit lo aporta la aplicacion anfitriona. Sin la guarda esto lanzaba un
 * ReferenceError en cualquier entorno que no lo tuviera —una prueba, un render
 * de servidor—, y `hide(0)` esperaba un booleano, no un numero.
 *
 * @param {string} selector
 * @returns {boolean}  si se llego a cerrar algo
 */
const hideDropdown = (selector) => {
	const element = globalThis.document?.querySelector(selector)

	if (! element || ! globalThis.UIkit?.dropdown) {
		return false
	}

	globalThis.UIkit.dropdown(element)?.hide(false)

	return true
}

export {
	hideDropdown
}
