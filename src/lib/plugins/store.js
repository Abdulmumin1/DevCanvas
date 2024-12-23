export const fontawesomeLINK = `<link id="fontawesomeDSFE4o431!!" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
crossorigin="anonymous" referrerpolicy="no-referrer" />
`;

export const materialiconsLINK = `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />`;
export const bootstrapLINK = `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">`;
export const animejsCDN = `https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js`;
export const gsapCDN = `https://unpkg.com/gsap`;
export const framermotionCDN = `https://cdn.jsdelivr.net/npm/@motionone/types@10.16.3/dist/index.es.min.js`;
export const scrollrevealCDN = `https://unpkg.com/scrollreveal`;
export const threejsCDN = `https://unpkg.com/three`;

export const cdns = {
	animejs: animejsCDN,
	gsap: gsapCDN,
	motionone: framermotionCDN,
	scrollreveal: scrollrevealCDN,
	threejs: threejsCDN
};

export function setup_js_plugin(name, plugins, iframeDoc) {
	const pluginHTML = iframeDoc.getElementById(`${name}DSFE4o431!!`);
	if (plugins[name]) {
		// const plugin = iframeDoc.createElement('script');
		let src = cdns[name];
		let id = `${name}DSFE4o431!!`;
		if (!pluginHTML) {
			loadScriptFromURL(src, iframeDoc, id)
				.then(() => {
					// Do something after the script is loaded
				})
				.catch((error) => {
					//
				});
		}
	} else {
		if (pluginHTML) {
			pluginHTML.remove();
		}
	}
}

export function injectHeadContent(plugins, iframeDoc) {
	const tailwindScriptHTML = iframeDoc.getElementById('tailwincssDSFE4o431!!');
	const fontawesomeHTML = iframeDoc.getElementById('fontawesomeDSFE4o431!!');
	const materialiconsHTML = iframeDoc.getElementById('materialiconsDSFE4o431!!');
	const bootstrapHTML = iframeDoc.getElementById('bootstrapDSFE4o431!!');

	if (plugins.fontawesome) {
		// Create a temporary HTML element
		const tempElement = iframeDoc.createElement('div');

		// Set the HTML code as text
		tempElement.innerHTML = fontawesomeLINK;
		// Extract the first child element (the <link> element) from the temporary element
		let fontawesome = tempElement.firstElementChild;

		// check if it exists

		if (!fontawesomeHTML) {
			iframeDoc.head.appendChild(fontawesome);
		}
	} else {
		if (fontawesomeHTML) {
			fontawesomeHTML.remove();
		}
	}

	if (plugins.bootstrap) {
		// Create a temporary HTML element
		const tempElement = iframeDoc.createElement('div');

		// Set the HTML code as text
		tempElement.innerHTML = bootstrapLINK;
		// Extract the first child element (the <link> element) from the temporary element
		let bootstrap = tempElement.firstElementChild;

		// check if it exists

		if (!bootstrapHTML) {
			iframeDoc.head.appendChild(bootstrap);
		}
	} else {
		if (bootstrapHTML) {
			bootstrapHTML.remove();
		}
	}

	if (plugins.materialicons) {
		// Create a temporary HTML element
		const tempElement = iframeDoc.createElement('div');

		// Set the HTML code as text
		tempElement.innerHTML = materialiconsLINK;
		// Extract the first child element (the <link> element) from the temporary element
		let materialicons = tempElement.firstElementChild;
		materialicons.id = 'materialiconsDSFE4o431!!';

		// check if it exists
		if (!materialiconsHTML) {
			iframeDoc.head.appendChild(materialicons);
		}
	} else {
		if (materialiconsHTML) {
			materialiconsHTML.remove();
		}
	}

	if (plugins.tailwind) {
		const tailwindScript = iframeDoc.createElement('script');
		tailwindScript.setAttribute('defer', true);
		tailwindScript.src = 'https://cdn.tailwindcss.com';
		tailwindScript.id = 'tailwincssDSFE4o431!!';

		if (!tailwindScriptHTML) {
			iframeDoc.head.appendChild(tailwindScript);
		}
	} else {
		if (tailwindScriptHTML) {
			tailwindScriptHTML.remove();
		}
	}
}

export function loadScriptFromURL(url, iframe, id) {
	return new Promise((resolve, reject) => {
		fetch(url)
			.then((response) => {
				if (!response.ok) {
					throw new Error('Failed to fetch script');
				}
				return response.text();
			})
			.then((scriptText) => {
				const scriptElement = iframe.createElement('script');
				scriptElement.textContent = scriptText;
				scriptElement.id = id;
				scriptElement.onload = resolve;
				scriptElement.onerror = reject;
				iframe.body.appendChild(scriptElement);
			})
			.catch((error) => {
				console.error('Error fetching or loading script:', error);
				reject(error);
			});
	});
}
