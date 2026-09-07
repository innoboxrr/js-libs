/**
 * Este modulo era una tercera copia del mismo helper: existia aqui, en
 * innoboxrr-form-elements y en su gemelo React, con los mismos dos fallos en
 * las tres —URL.createObjectURL sin guarda y un icono servido por un tercero—.
 *
 * La implementacion vive ahora en innoboxrr-form-core. Aqui solo queda el
 * reenvio, para no romper a quien ya importaba desde js-libs.
 *
 * @deprecated Importa desde 'innoboxrr-form-core'.
 */

export {
	FILE_ICON,
	describeFiles,
	errorsFor,
	isImage,
	isVideo,
	previewFor,
	sizeParser,
	validateFiles,
} from 'innoboxrr-form-core'
