const shuffleArray = (array) => {

	return array.sort(() => Math.random() - 0.5);

}

const optionsKeyPair = (options) => {

	return options.map(option => {

		return {id: option, name: option}

	});

}

const arrayToHtmlList = (array, type = 'ul') => {

	let html = '<' + type + '>';

		for (i = 0; i < array.length; ++i) {

	        html += '<li>';

	        	html += array[i];

	        html += '</li>';

	    }

		html += '</' + type + '>';

	return html;

}

export {
	shuffleArray,
	optionsKeyPair,
	arrayToHtmlList
};