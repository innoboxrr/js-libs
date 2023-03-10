const buildMetaTags = (metas) => {

	let metaTags = [];

	metas.forEach( meta => {

		let metaTagStr = '<meta ';

		for(const prop in meta) {

			let key = prop;
			
			let value = meta[prop];

			metaTagStr += (key + '="' + value + '" ');

		}

		metaTagStr += '>';

		let metaTag = createMetaTag(metaTagStr);

		metaTags.push(metaTag);

	});

	return metaTags;

}

const createMetaTag = (metaTagStr) => {

	let template = document.createElement('template');

	template.innerHTML = metaTagStr.trim();

	return template.content.firstChild;

}

const appendMetaTags = (metaTags) => {

	metaTags.forEach( metaTag => {

		document.head.appendChild(metaTag);

	});

}

const set = (metas) => {

	if(Array.isArray(metas)) {

		let metaTags = buildMetaTags(metas);

		appendMetaTags(metaTags);

	}

}

const update = (metas) => {

	if(Array.isArray(metas)) {

		metas.forEach( meta => {

			for(const prop in meta) {

				let key = prop;
			
				let value = meta[prop];

				let metaTag = document.querySelector(`meta[${key}="${value}"]`);

				if(metaTag != null) {

					metaTag.setAttribute('content', meta['content']);

				}
	
				break;

			}

		});

	}

}

export {
	set,
	update
}