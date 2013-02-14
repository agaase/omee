/**
 * Loads a particular URL.
 * @param url - The 
 * @param page -  A new page (_blank), parent page (_self).
 */
function loadURL(url,page) {
	url=unescape(url);
	window.open(url, "_self", false);
}

/**
 * Loads an external javascript file into the page.
 * @param url - The url of the javascript file.
 */
function loadScript(url) {
	// adding the script tag to the head as suggested before
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = url;

	// fire the loading
	head.appendChild(script);
}


/**
 * Raises an ajax request to the server.
 * 
 * @param params -
 *            Parameters to the request.
 * @param url -
 *            The url of the request.
 * @param func -
 *            The function to be called back when response is received.
 * @param connType -
 */
function raiseAjaxRequest(params, url, func, connType) {
	var xmlhttp;
	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} else {// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			if (func.indexOf(".") > -1) {
				var res = xmlhttp.responseText;

				var str = func.substring(0, func.lastIndexOf("."));
				var f = eval(str);
				str = func.substring(func.lastIndexOf(".") + 1, func.length);
				f[str](res);
			} else {
				var fn = window[func];

				var resp = fn(xmlhttp.responseText);
				return resp;
			}
		}
	}
	xmlhttp.open(connType, url, true);
	xmlhttp.setRequestHeader("Content-type",
			"application/x-www-form-urlencoded");
	xmlhttp.send(params);
}


/**
 * Creates an element with the given html code.
 * 
 * @param html - The html code inside the html.
 * @param type - Type - div, span etc.
 * @returns 
 */
function createElement(html,type) {
	var element = document.createElement(type);
	element.innerHTML = html;
	return element;
}


/**
 * Returns the element with the specified id.
 * 
 * @param id
 * @returns
 */
function element(id) {
	var element = document.getElementById(id);
	return element;
}


/**
 * Assign an event to an element.
 * 
 * @param id - The id of the element.
 * @param event - Event to be assigned.
 * @param func - The function to be called.
 */
function assignEvent(id, event, func) {
	var element = document.getElementById(id);
	element.setAttribute(event, func);
}


/**
 * Selects the option of the select type element based on value.
 * 
 * @param id - The id of the select element.
 * @param value - The value to be selected.
 */
function selectElement(id, value) {
	var selElement = element(id);
	if (selElement != undefined) {
		for ( var i = 0; i < selElement.options.length; i++) {
			if (selElement.options[i].value == value)
				selElement.options[i].selected = true;
		}
	}
}
