import { escapeHtml } from './string.js'

/**
 * Construye las etiquetas `<meta>` a partir de una lista de objetos.
 *
 * La versión anterior concatenaba los valores dentro de una cadena HTML y la
 * pasaba por `innerHTML` sin escapar nada. Una descripción con una comilla
 * doble se salía del atributo, y con contenido venido de la API eso es una
 * inyección de marcado en el `<head>`. Aquí las etiquetas se construyen con
 * `setAttribute`, que no interpreta nada.
 *
 * @param {Array<Record<string, string>>} metas
 * @returns {HTMLMetaElement[]}
 */
const buildMetaTags = (metas) => (metas ?? []).map((meta) => {
    const tag = document.createElement('meta')

    Object.entries(meta ?? {}).forEach(([key, value]) => {
        tag.setAttribute(key, String(value ?? ''))
    })

    return tag
})

/**
 * @param {string} html
 * @returns {ChildNode|null}
 */
const createMetaTag = (html) => {
    const template = document.createElement('template')

    template.innerHTML = String(html ?? '').trim()

    return template.content.firstChild
}

/**
 * @param {HTMLMetaElement[]} metaTags
 */
const appendMetaTags = (metaTags) => {
    (metaTags ?? []).forEach((metaTag) => document.head.appendChild(metaTag))
}

/**
 * @param {Array<Record<string, string>>} metas
 */
const set = (metas) => {
    if (! Array.isArray(metas)) {
        return
    }

    appendMetaTags(buildMetaTags(metas))
}

/**
 * Actualiza el `content` de las etiquetas que ya existan.
 *
 * La primera clave del objeto identifica la etiqueta (`name`, `property`…) y
 * `content` es el valor nuevo. Lo hacía con un `for...in` que terminaba en un
 * `break`, lo que decía lo mismo de forma bastante más críptica.
 *
 * @param {Array<Record<string, string>>} metas
 */
const update = (metas) => {
    if (! Array.isArray(metas)) {
        return
    }

    metas.forEach((meta) => {
        const [key, value] = Object.entries(meta ?? {})[0] ?? []

        if (! key || meta.content === undefined) {
            return
        }

        // Con comillas y escapado: un valor con comillas rompía el selector.
        const selector = `meta[${key}="${String(value).replace(/(["\\])/g, '\\$1')}"]`

        document.querySelector(selector)?.setAttribute('content', meta.content)
    })
}

export {
    set,
    update,
    buildMetaTags,
    appendMetaTags,
    createMetaTag,
    escapeHtml
}
