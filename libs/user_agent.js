var platform = require('platform');

const parsePlatform = (ua) => {

	var info = platform.parse(ua);

	return {
		name: info.name, // 'Safari'
		version: info.version, // '5.1'
		product: info.product, // 'iPad'
		manufacturer: info.manufacturer, // 'Apple'
		layout: info.layout, // 'WebKit'
		os: info.os, // 'iOS 5.0'
		description: info.description, // 'Safari 5.1 on Apple iPad (iOS 5.0)'
	}

}

export {
	parsePlatform
}