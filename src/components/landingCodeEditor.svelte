<script>
	import { faSpinner } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import { current_data, previewMode, user, saved_spinner } from '$lib/index.js';
	import { browser } from '$app/environment';
	import Fa from 'svelte-fa';
	import { EditorView } from '@codemirror/view';
	import { basicSetup } from 'codemirror';
	import { javascript } from '@codemirror/lang-javascript';
	import { python } from '@codemirror/lang-python';
	import { EditorState } from '@codemirror/state';

	import { supabase } from '$lib/supabase.js';

	let editorContainer;
	let editorView;
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

	const getLanguageExtension = () => {
		if (lang === 'python') {
			return python();
		}
		return javascript();
	};

	onMount(() => {
		if (browser) {
			const fontSize = window.innerWidth <= 600 ? 10 : 14;
			editorView = new EditorView({
				parent: editorContainer,
				doc: initialCode,
				extensions: [
					basicSetup,
					getLanguageExtension(),
					EditorView.theme({
						'&': { height: '100%' },
						'.cm-content': { fontSize: `${fontSize}px` }
					})
				]
			});
		}

		window.addEventListener('resize', () => {
			if (editorView) {
				editorView.requestMeasure();
			}
		});
		loading = false;
	});
</script>

{#if loading}
	<div class="flex h-full items-center justify-center">
		<Fa icon={faSpinner} class="animate-spin text-2xl" />
	</div>
{:else}
	<div class="editor-container z-50 h-full" bind:this={editorContainer} />
{/if}

<style>
	/* Set the height of the editor container */
	.editor-container {
		height: 100%;
		width: 100%;
	}
</style>
