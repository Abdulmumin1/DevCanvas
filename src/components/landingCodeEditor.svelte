<script>
	import { faSpinner } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import { current_data, previewMode, user, saved_spinner } from '$lib/index.js';
	import { browser } from '$app/environment';
	import Fa from 'svelte-fa';
	// import * as monaco from 'monaco-editor';

	import { supabase } from '$lib/supabase.js';

	let editorContanier;
	let editor;
	let loading = true;
	export let lang = 'javascript';

	// Define the initial code content
	export let initialCode = `class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        if not self.is_empty():
            return self.items.pop()
        else:
            raise IndexError("pop from empty stack")

    def peek(self):
        if not self.is_empty():
            return self.items[-1]
        else:
            raise IndexError("peek from empty stack")

    def is_empty(self):
        return len(self.items) == 0

    def size(self):
        return len(self.items)`;
	let editorConfig;
	if (browser) {
		editorConfig = {
			value: initialCode,
			language: lang,
			minimap: { enabled: false },
			...(window.innerWidth <= 600 && { fontSize: 10 })
		};
	}
	onMount(() => {
		import('monaco-editor').then((monaco) => {
			// Use monaco here...
			// Initialize the editor
			editor = monaco.editor.create(editorContanier, editorConfig);
		});

		window.addEventListener('resize', () => {
			if (editor) {
				editor.layout();
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
