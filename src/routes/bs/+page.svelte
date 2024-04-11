<script>
	import { onMount } from 'svelte';

	let htmlCode = `
      <h1>Hello from Shadow DOM!</h1>
      <p>This content is encapsulated within a shadow DOM.</p>
    `;
	let cssCode = '.container { border: 2px solid black; padding: 20px; } h1 { color: blue; }';
	let jsCode = 'console.log("JavaScript code executed!");';

	// Function to create style element from CSS code
	function createStyleElement(cssCode) {
		const style = document.createElement('style');
		style.textContent = cssCode;
		return style;
	}

	// Function to create script element from JS code
	function createScriptElement(jsCode) {
		const script = document.createElement('script');
		script.textContent = jsCode;
		return script;
	}

	// Function to capture screenshot of the web component
	async function captureScreenshot() {
		const webComponent = document.querySelector('custom-component');
		if (webComponent) {
			const captureCanvas = document.createElement('canvas');
			const captureContext = captureCanvas.getContext('2d');

			// Set canvas size to the size of the web component
			captureCanvas.width = webComponent.offsetWidth;
			captureCanvas.height = webComponent.offsetHeight;

			// Draw the web component onto the canvas
			captureContext.drawImage(webComponent.shadowRoot.querySelector('.container'), 0, 0);

			// Convert the canvas to a data URL representing the PNG image
			const imageDataURL = captureCanvas.toDataURL('image/png');

			// Create a temporary link element to download the image
			const downloadLink = document.createElement('a');
			downloadLink.href = imageDataURL;
			downloadLink.download = 'screenshot.png';

			// Simulate click on the link to trigger download
			downloadLink.click();
		} else {
			console.error('Custom component not found in the DOM.');
		}
	}

	// Lifecycle hook to ensure the custom component is rendered before capturing screenshot
	onMount(() => {
		// Define the custom element
		class CustomComponent extends HTMLElement {
			constructor() {
				super();
				const shadow = this.attachShadow({ mode: 'open' }); // Create a shadow DOM
				const container = document.createElement('div'); // Create a container within the shadow DOM
				container.classList.add('container');
				shadow.appendChild(container); // Append the container to the shadow DOM

				container.innerHTML = htmlCode; // Render HTML code within the container

				// Attach style and script elements to shadow DOM
				shadow.appendChild(createStyleElement(cssCode));
				shadow.appendChild(createScriptElement(jsCode));
			}
		}

		// Define the custom element tag
		customElements.define('custom-component', CustomComponent);
	});
</script>

<div id="web-component-container" />

<!-- Button to trigger screenshot capture -->
<button on:click={captureScreenshot}>Capture Screenshot</button>

<style>
	/* Your CSS styles here */
	.container {
		border: 2px solid black;
		padding: 20px;
	}
</style>
