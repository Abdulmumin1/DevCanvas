'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.generateRandomKey = generateRandomKey;
exports.setProfile = setProfile;
exports.getProfile = getProfile;
exports.getLastPartOfUrl = getLastPartOfUrl;
exports.saveToLocalStorage = saveToLocalStorage;
exports.getFromLocalStorage = getFromLocalStorage;
exports.clickOutside = clickOutside;
exports.saveData = saveData;
exports.copyTextToClipboard = copyTextToClipboard;
exports.supportedLanguages =
	exports['goto'] =
	exports.renderIndentGuidesSetting =
	exports.smallerFontSize =
	exports.formatOnPasteSetting =
	exports.autoIndentSetting =
	exports.wordWrapSetting =
	exports.showToast =
	exports.pageLimit =
	exports.pageCount =
	exports.isOwner =
	exports.saved_spinner =
	exports.pageCountSnips =
	exports.pageCountPl =
	exports.SnippetsDescription =
	exports.delayPreview =
	exports.editorSettingState =
	exports.autoSavefast =
	exports.dashboardLoading =
	exports.previewMode =
	exports.user =
	exports.current_data =
	exports.darkModeState =
	exports.user_info =
	exports.showNavigating =
		void 0;

var _svelte = require('svelte');

var _store = require('svelte/store');

// place files you want to import through the `$lib` alias in this folder.
var showNavigating = (0, _store.writable)(false);
exports.showNavigating = showNavigating;
var user_info = (0, _store.writable)([]);
exports.user_info = user_info;
var darkModeState = (0, _store.writable)(false);
exports.darkModeState = darkModeState;
var current_data = (0, _store.writable)({});
exports.current_data = current_data;
var user = (0, _store.writable)(false);
exports.user = user;
var previewMode = (0, _store.writable)(true);
exports.previewMode = previewMode;
var dashboardLoading = (0, _store.writable)(true);
exports.dashboardLoading = dashboardLoading;
var autoSavefast = (0, _store.writable)(true);
exports.autoSavefast = autoSavefast;
var editorSettingState = (0, _store.writable)(false);
exports.editorSettingState = editorSettingState;
var delayPreview = (0, _store.writable)(false);
exports.delayPreview = delayPreview;
var SnippetsDescription = (0, _store.readable)({
	name: 'DevCanvas',
	des: 'DevCanvas is an open-source online editor. It provides a simple and intuitive interface for developers to share, discover, and discuss code snippets across various programming languages and use cases.',
	url: 'https://devcanvas.art',
	imageUrl:
		'https://raw.githubusercontent.com/Abdulmumin1/snippetLand/6643c0d26744f6231aa168bf352c27b49664ba66/static/devCanvas.png'
});
exports.SnippetsDescription = SnippetsDescription;
var pageCountPl = (0, _store.writable)(12);
exports.pageCountPl = pageCountPl;
var pageCountSnips = (0, _store.writable)(6);
exports.pageCountSnips = pageCountSnips;
var saved_spinner = (0, _store.writable)(false);
exports.saved_spinner = saved_spinner;
var isOwner = (0, _store.writable)(false);
exports.isOwner = isOwner;
var pageCount = (0, _store.writable)(12);
exports.pageCount = pageCount;
var pageLimit = (0, _store.writable)(3);
exports.pageLimit = pageLimit;
var showToast = (0, _store.writable)(false);
exports.showToast = showToast;
var wordWrapSetting = (0, _store.writable)(true);
exports.wordWrapSetting = wordWrapSetting;
var autoIndentSetting = (0, _store.writable)(true);
exports.autoIndentSetting = autoIndentSetting;
var formatOnPasteSetting = (0, _store.writable)(true);
exports.formatOnPasteSetting = formatOnPasteSetting;
var smallerFontSize = (0, _store.writable)(false);
exports.smallerFontSize = smallerFontSize;
var renderIndentGuidesSetting = (0, _store.writable)(false);
exports.renderIndentGuidesSetting = renderIndentGuidesSetting;

function generateRandomKey() {
	// Define the characters to be used in the random key
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var keyLength = 6; // You can adjust the length of the key as per your requirement

	var randomKey; // Generate a random key

	randomKey = '';

	for (var i = 0; i < keyLength; i++) {
		var randomIndex = Math.floor(Math.random() * characters.length);
		randomKey += characters[randomIndex];
	}

	return randomKey;
}

var profile_key = 'profile';

function setProfile(value) {
	(0, _svelte.setContext)(profile_key, (0, _store.writable)(value));
}

function getProfile() {
	return (0, _svelte.getContext)(profile_key);
}

function getLastPartOfUrl(url) {
	var parts = url.split('/');
	return parts[parts.length - 1];
}

function saveToLocalStorage(itemsArray) {
	localStorage.setItem('owner', JSON.stringify(itemsArray));
}

function getFromLocalStorage() {
	try {
		var savedItems = JSON.parse(localStorage.getItem('owner'));
		return savedItems;
	} catch (_unused) {
		return [];
	}
}
/** Dispatch event on click outside of node */

function clickOutside(node) {
	var handleClick = function handleClick(event) {
		if (node && !node.contains(event.target) && !event.defaultPrevented) {
			node.dispatchEvent(new CustomEvent('click_outside', node));
		}
	};

	document.addEventListener('click', handleClick, true);
	return {
		destroy: function destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
}

var _goto = function _goto(path) {
	window.location.href = path;
};

exports['goto'] = _goto;

function appendJSONToFormData(json, formData, which) {
	for (var key in json) {
		if (which == key || which == true) {
			formData.append(key, json[key]);
		}
	}

	formData.append('id', json['id']);
}

function saveData(json_data) {
	var all,
		formData,
		response,
		_args = arguments;
	return regeneratorRuntime.async(function saveData$(_context) {
		while (1) {
			switch ((_context.prev = _context.next)) {
				case 0:
					all = _args.length > 1 && _args[1] !== undefined ? _args[1] : true;
					formData = new FormData();
					saved_spinner.set(true);
					previewMode.set(false);
					appendJSONToFormData(json_data, formData, all);
					_context.next = 7;
					return regeneratorRuntime.awrap(
						fetch('?/update', {
							method: 'POST',
							body: formData
						})
					);

				case 7:
					response = _context.sent;

					if (response.ok) {
						// Handle save success
						console.log('full');
					} else {
						// Handle save failed
						console.log('failed');
					}

					saved_spinner.set(false);
					previewMode.set(true);

				case 11:
				case 'end':
					return _context.stop();
			}
		}
	});
}

var supportedLanguages = [
	'javascript',
	'python',
	'html',
	'css',
	'java',
	'ruby',
	'swift',
	'typescript',
	'csharp',
	'php',
	'go',
	'rust',
	'kotlin',
	'sql',
	'shell/bash',
	'json',
	'yaml',
	'markdown',
	'xml',
	'r',
	'perl',
	'objective-c',
	'dart',
	'scala',
	'haskell',
	'lua',
	'matlab',
	'powershell',
	'groovy',
	'coffeescript',
	'elixir',
	'fsharp',
	'vb.net',
	'crystal',
	'julia',
	'typescriptreact',
	'jsx',
	'kotlinandroid',
	'swiftios',
	'matlab',
	'matlabsession',
	'ini',
	'toml',
	'perl6',
	'swiftpm',
	'yaml',
	'diff',
	'http',
	'makefile',
	'rubyirb',
	'docker',
	'raku',
	'rspec',
	'http',
	'haskellcabal',
	'apacheconf',
	'nginx',
	'smalltalk',
	'cmake',
	'webassembly',
	'glsl',
	'shellsession',
	'shell',
	'plaintext',
	'c',
	'cpp'
].sort();
exports.supportedLanguages = supportedLanguages;

function copyTextToClipboard(text) {
	if (!navigator.clipboard) {
		// Fallback for browsers that do not support the Clipboard API
		var textArea = document.createElement('textarea');
		textArea.value = text;
		textArea.style.position = 'fixed'; // Ensure it's off-screen

		document.body.appendChild(textArea);
		textArea.select();

		try {
			var successful = document.execCommand('copy');
			var message = successful ? 'Copied to clipboard' : 'Unable to copy to clipboard';
			alert(message);
		} catch (err) {
			console.error('Error copying text: ', err);
		} finally {
			document.body.removeChild(textArea);
		}
	} else {
		// Use the Clipboard API if available
		navigator.clipboard
			.writeText(text)
			.then(function () {
				console.log('Text copied to clipboard');
			})
			['catch'](function (err) {
				console.error('Error copying text: ', err);
			});
	}
}
