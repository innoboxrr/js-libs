import { afterEach, describe, expect, it, vi } from 'vitest'

import * as array from '../libs/array.js'
import * as currency from '../libs/currency.js'
import * as json from '../libs/json.js'
import * as metas from '../libs/metas.js'
import * as number from '../libs/number.js'
import * as ui from '../libs/ui.js'
import * as validations from '../libs/validations.js'

afterEach(() => {
    document.head.querySelectorAll('meta').forEach((tag) => tag.remove())
    document.body.innerHTML = ''
    delete globalThis.UIkit
})

describe('array', () => {
    /**
     * `for (i = 0; ...)` no declaraba `i`, y un modulo ESM corre siempre en
     * modo estricto: la funcion lanzaba un ReferenceError cada vez.
     */
    it('arrayToHtmlList no lanza', () => {
        expect(array.arrayToHtmlList(['a', 'b'])).toBe('<ul><li>a</li><li>b</li></ul>')
    })

    it('acepta el tipo de lista', () => {
        expect(array.arrayToHtmlList(['a'], 'ol')).toBe('<ol><li>a</li></ol>')
    })

    /**
     * No escapaba nada, asi que un valor con `<` metia marcado en la pagina.
     */
    it('escapa el contenido', () => {
        expect(array.arrayToHtmlList(['<script>alert(1)</script>']))
            .toBe('<ul><li>&lt;script&gt;alert(1)&lt;/script&gt;</li></ul>')
    })

    it('una lista vacia sigue siendo una lista', () => {
        expect(array.arrayToHtmlList([])).toBe('<ul></ul>')
    })

    /**
     * `sort(() => Math.random() - 0.5)` es un barajado sesgado y ademas mutaba
     * el array de quien llamaba.
     */
    it('shuffleArray no toca el original', () => {
        const original = [1, 2, 3, 4, 5]
        const copy = [...original]

        array.shuffleArray(original)

        expect(original).toEqual(copy)
    })

    it('shuffleArray conserva todos los elementos', () => {
        const shuffled = array.shuffleArray([1, 2, 3, 4, 5])

        expect(shuffled).toHaveLength(5)
        expect([...shuffled].sort()).toEqual([1, 2, 3, 4, 5])
    })

    /**
     * Con el comparador aleatorio, la primera posicion no se repartia uniforme.
     * Con Fisher-Yates cada elemento cae ahi ~1/5 de las veces; el margen es
     * ancho a proposito, para que no falle por azar.
     */
    it('shuffleArray reparte uniforme', () => {
        const counts = new Map([1, 2, 3, 4, 5].map((n) => [n, 0]))

        for (let i = 0; i < 5000; i++) {
            const first = array.shuffleArray([1, 2, 3, 4, 5])[0]

            counts.set(first, counts.get(first) + 1)
        }

        for (const count of counts.values()) {
            expect(count).toBeGreaterThan(750)
            expect(count).toBeLessThan(1250)
        }
    })

    it('optionsKeyPair da la forma que esperan los selects', () => {
        expect(array.optionsKeyPair(['a'])).toEqual([{ id: 'a', name: 'a' }])
    })
})

describe('json', () => {
    const rows = [
        { key: 'seo_title', value: 'Título' },
        { key: 'seo_description', value: 'Descripción' },
    ]

    /**
     * `var search = search(obj, ...)` sombreaba a la funcion dentro del ambito,
     * asi que en el momento de la llamada `search` valia undefined y esto
     * lanzaba un TypeError. Nunca ha funcionado, pese a ser lo que el
     * ecosistema usa para leer metainformacion.
     */
    it('getValue devuelve el valor de la fila que coincide', () => {
        expect(json.getValue(rows, 'key', 'seo_title')).toBe('Título')
    })

    it('getValue cae al valor por defecto', () => {
        expect(json.getValue(rows, 'key', 'no-existe', 'value', 'def')).toBe('def')
        expect(json.getValue([], 'key', 'x', 'value', 'def')).toBe('def')
    })

    it('getValue admite otra columna de valor', () => {
        expect(json.getValue(rows, 'value', 'Título', 'key')).toBe('seo_title')
    })

    it('search devuelve todas las coincidencias', () => {
        expect(json.search(rows, 'key', 'seo_title')).toHaveLength(1)
        expect(json.search(rows, 'key', 'nada')).toEqual([])
    })

    it('jsonParser aguanta saltos de linea y caracteres de control', () => {
        expect(json.jsonParser('{"a":\n 1}')).toEqual({ a: 1 })
    })
})

describe('number', () => {
    /**
     * Quitaba todo lo que no fuera digito o punto, incluido el signo menos: un
     * adeudo se mostraba como un saldo a favor.
     */
    it('numberFormat conserva el signo', () => {
        expect(number.numberFormat(-1500)).toBe('-1,500')
        expect(number.numberFormat(-1234.56, 2)).toBe('-1,234.56')
    })

    it('numberFormat agrupa los miles', () => {
        expect(number.numberFormat(1234567)).toBe('1,234,567')
        expect(number.numberFormat(1234567.891, 2)).toBe('1,234,567.89')
    })

    it('numberFormat trata el cero y lo que no es numero', () => {
        expect(number.numberFormat(0, 2)).toBe('0.00')
        expect(number.numberFormat('hola')).toBe('0')
    })

    /**
     * El signo no cuenta como digito.
     */
    it('zfill rellena a la izquierda', () => {
        expect(number.zfill(7, 3)).toBe('007')
        expect(number.zfill(-5, 3)).toBe('-005')
        expect(number.zfill(1234, 3)).toBe('1234')
    })

    it('decimalToHexString', () => {
        expect(number.decimalToHexString(255)).toBe('FF')
        expect(number.decimalToHexString(-1)).toBe('FFFFFFFF')
    })
})

describe('validations', () => {
    it('valida emails', () => {
        expect(validations.emailValidation('a@b.com')).toBe(true)
        expect(validations.emailValidation('no-es-un-email')).toBe(false)
    })

    /**
     * La expresion no estaba anclada: cualquier texto que contuviera algo
     * parecido a una URL pasaba.
     */
    it('no da por buena una url dentro de un texto', () => {
        expect(validations.urlValidation('esto no es una url http://x.com')).toBe(false)
        expect(validations.urlValidation('https://innoboxrr.com/a?b=1')).toBe(true)
        expect(validations.urlValidation('  https://innoboxrr.com  ')).toBe(true)
    })
})

describe('ui', () => {
    /**
     * UIkit lo aporta la aplicacion anfitriona: sin la guarda esto lanzaba un
     * ReferenceError en cualquier entorno que no lo tuviera.
     */
    it('sin UIkit no lanza', () => {
        document.body.innerHTML = '<div id="d"></div>'

        expect(() => ui.hideDropdown('#d')).not.toThrow()
        expect(ui.hideDropdown('#d')).toBe(false)
    })

    it('con UIkit lo cierra', () => {
        document.body.innerHTML = '<div id="d"></div>'

        const hide = vi.fn()

        globalThis.UIkit = { dropdown: () => ({ hide }) }

        expect(ui.hideDropdown('#d')).toBe(true)
        expect(hide).toHaveBeenCalledWith(false)
    })

    it('un selector que no existe no lanza', () => {
        globalThis.UIkit = { dropdown: () => ({ hide: vi.fn() }) }

        expect(ui.hideDropdown('#no-existe')).toBe(false)
    })
})

describe('metas', () => {
    it('escribe las etiquetas en el head', () => {
        metas.set([{ name: 'description', content: 'Hola' }])

        expect(document.head.querySelector('meta[name="description"]').content).toBe('Hola')
    })

    /**
     * Concatenaba los valores en una cadena HTML que pasaba por innerHTML: una
     * comilla doble se salia del atributo, y con contenido venido de la API eso
     * es marcado inyectado en el <head>.
     */
    it('un valor con comillas no se sale del atributo', () => {
        const hostil = '"><script>alert(1)</script>'

        metas.set([{ name: 'description', content: hostil }])

        // El valor se guarda tal cual, como atributo, sin llegar a parsearse.
        expect(document.head.querySelector('meta[name="description"]').content).toBe(hostil)
        expect(document.head.querySelectorAll('script')).toHaveLength(0)
    })

    it('update cambia el content de la que ya existe', () => {
        metas.set([{ name: 'description', content: 'Antes' }])
        metas.update([{ name: 'description', content: 'Después' }])

        expect(document.head.querySelector('meta[name="description"]').content).toBe('Después')
        expect(document.head.querySelectorAll('meta[name="description"]')).toHaveLength(1)
    })

    it('update ignora lo que no existe', () => {
        expect(() => metas.update([{ name: 'no-existe', content: 'x' }])).not.toThrow()
    })

    it('lo que no es un array se ignora', () => {
        expect(() => metas.set('no soy un array')).not.toThrow()
        expect(document.head.querySelectorAll('meta')).toHaveLength(0)
    })
})

describe('currency', () => {
    /**
     * Devolvia una promesa que nunca se rechazaba: sin catch y con `reject` sin
     * usar, un fallo de red dejaba la promesa pendiente para siempre.
     */
    it('un fallo de red se propaga en vez de colgar', async () => {
        vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network Error'))

        await expect(currency.currencyRates()).rejects.toThrow('Network Error')

        globalThis.fetch.mockRestore()
    })

    it('una respuesta no ok tambien', async () => {
        vi.spyOn(globalThis, 'fetch').mockResolvedValue({ ok: false, status: 503 })

        await expect(currency.currencyRates()).rejects.toThrow('503')

        globalThis.fetch.mockRestore()
    })

    it('devuelve los tipos con MXN como base', async () => {
        vi.spyOn(globalThis, 'fetch').mockResolvedValue({
            ok: true,
            json: async () => ({ EUR: 0.05, USD: 0.058 }),
        })

        await expect(currency.currencyRates()).resolves.toEqual({ MXN: 1, EUR: 0.05, USD: 0.058 })

        globalThis.fetch.mockRestore()
    })

    it('el endpoint se puede apuntar a otro sitio', async () => {
        const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
            ok: true,
            json: async () => ({}),
        })

        await currency.currencyRates({ endpoint: 'https://otro/rates' })

        expect(fetchMock).toHaveBeenCalledWith('https://otro/rates', expect.anything())

        fetchMock.mockRestore()
    })

    it('los simbolos son cadenas', () => {
        const symbols = currency.currencySymbols()

        expect(symbols.MXN).toBe('$')
        expect(Object.values(symbols).every((s) => typeof s === 'string')).toBe(true)
    })
})
