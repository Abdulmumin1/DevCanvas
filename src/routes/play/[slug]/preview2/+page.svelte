<!-- Preview.svelte -->
<script>
	import { onMount, onDestroy } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import { createServer } from 'http-server';

	const dispatch = createEventDispatcher();
	let serverUrl = '';

	// Function to start the server
	function startServer(html, css, js) {
		// Start the server programmatically
		const server = createServer({ cache: -1 });
		server.listen(0, 'localhost', () => {
			const port = server.server.address().port;
			serverUrl = `http://localhost:${port}/preview.html`;

			// Create a preview HTML file with dynamic content
			const previewHtml = `
		  <!DOCTYPE html>
		  <html lang="en">
		  <head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Preview</title>
			<style>${css}</style>
		  </head>
		  <body>${html}</body>

		  </html>
		`;

			// Serve the preview HTML content
			server.server.on('request', (req, res) => {
				if (req.url === '/preview.html') {
					res.writeHead(200, { 'Content-Type': 'text/html' });
					res.end(previewHtml);
				}
			});
		});

		return server;
	}

	let server;

	// Function to stop the server
	function stopServer() {
		if (server) {
			server.server.close();
		}
	}

	export let data;

	// Watch for changes in HTML, CSS, and JS content
	let html = data.details.html;
	let css = data.details.css;
	let js = data.details.js;

	onDestroy(() => {
		// clearInterval(watcher);
		stopServer();
	});
</script>

<iframe
	src={serverUrl}
	title="preview"
	frameborder="0"
	width="100%"
	height="400"
	onload={() => {
		startServer(html, css, js);
	}}
/>
