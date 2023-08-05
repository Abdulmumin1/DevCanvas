<script>
	import { faSpinner } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import { current_data, previewMode } from '$lib/index.js';
	import Fa from 'svelte-fa';
	// import * as monaco from 'monaco-editor';
	let editorContanier;
	let editor;
	let loading = true;
	export let lang = 'javascript';

	// Define the initial code content
	export let initialCode = `function greet(name) {
	return 'Hello, ' + name + '!';
}`;

	function handleContentChange(data) {
		current_data.update((cur) => {
			return { ...cur, code: data };
		});
		// console.log($current_data);datadata
		// console.log(data);
	}

	onMount(() => {
		import('monaco-editor').then((monaco) => {
			// Use monaco here...
			// Initialize the editor
			editor = monaco.editor.create(editorContanier, {
				value: initialCode,
				language: lang,
				theme: 'hc-dark'
			});

			// Attach an event listener for changes in the code
			editor.onDidChangeModelContent(() => {
				try {
					console.log(editor.getValue());
					if (!$previewMode) {
						console.log('owner');
						handleContentChange(editor.getValue());
					}
				} catch {
					console.log('err');
				}
			});
		});

		window.addEventListener('resize', () => {
			if (editor) {
				console.log(editor.layout());
			}
		});
		loading = false;
	});
</script>

{#if loading}
	<div class="h-full flex justify-center items-center">
		<Fa icon={faSpinner} class="animate-spin text-2xl" />
	</div>
{:else}
	<div class="editor-container p-2" bind:this={editorContanier} />
{/if}

<style>
	/* Set the height of the editor container */
	.editor-container {
		height: 450px;
		max-height: 700px;
		width: 100%;
	}
</style>
