<script>
	import { faSpinner } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import { current_data, previewMode, user } from '$lib/index.js';
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
		try {
			if ($user.id == $current_data.user_id) {
				previewMode.set(false);
				current_data.update((cur) => {
					// console.log(cur);
					return { ...cur, code: data };
				});
			} else {
				console.log('lier');
			}
		} catch (error) {
			console.log('err');
		}
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
					// console.log(editor.getValue());
					handleContentChange(editor.getValue());
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
	<div class="editor-container h-full z-50" bind:this={editorContanier} />
{/if}

<style>
	/* Set the height of the editor container */
	.editor-container {
		height: 100%;
		width: 100%;
	}
</style>
