const hideDropdown = (selector) => {

	if(document.querySelector(selector)) UIkit.dropdown(selector).hide(0);

} 

export {
	hideDropdown
}