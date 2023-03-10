/* DEPRECATED: Use string.js method instead */
const replaceWord = (word, object) => {

    return object[word];

}

const validateObjectReqProps = (obj, schema) => {

	return (Object.keys(obj).filter(key => schema.includes(key)).length === schema.length);

}

export {
	
	replaceWord,

	validateObjectReqProps

};