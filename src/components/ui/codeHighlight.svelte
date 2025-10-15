<script>
	import { faL, faSpinner } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import {
		current_data,
		previewMode,
		user,
		saved_spinner,
		saveData,
		darkModeState
	} from '$lib/stores/index.js';
	import { browser } from '$app/environment';
	import Fa from 'svelte-fa';
	import { EditorView } from '@codemirror/view';
	import { basicSetup } from 'codemirror';
	import { javascript } from '@codemirror/lang-javascript';
	import { html } from '@codemirror/lang-html';
	import { css } from '@codemirror/lang-css';
	import { EditorState } from '@codemirror/state';
	import { createTheme } from '$lib/config/editorTheme.js';

	let editorContainer = $state();
	let editorView;
	let loading = $state(true);

	
	/**
	 * @typedef {Object} Props
	 * @property {string} [lang]
	 * @property {any} [initialCode] - Define the initial code content
	 */

	/** @type {Props} */
	let { lang = 'javascript', initialCode = `function greet(name) {
	return 'Hello, ' + name + '!';
}` } = $props();
	if (browser) {
		editorConfig = {
			value: initialCode,
			language: lang,
			automaticLayout: true,
			formatOnPaste: true,
			emmet: {
				enabled: true // Enable Emmet support
			},
			renderIndentGuides: false,
			minimap: { enabled: false },
			...(window.innerWidth <= 600 && { fontSize: 12, wordWrap: 'on' })
		};
	}

	// Define a custom action for saving

	// Register the save action
	// editor.addAction(saveAction);
	let saved = true;
	let typingTimer; // Timer to track typing
	const delay = 1000; // Adjust the delay as needed (in milliseconds)

	// Function to handle text input
	function handleAutoSave() {
		clearTimeout(typingTimer); // Clear the previous timer

		typingTimer = setTimeout(function () {
			// This function will run after the delay (user has stopped typing)
			save();
		}, delay);
	}

	async function save() {
		saved = false;
		saved_spinner.set(true);
		saveData($current_data, 'code');
		saved = true;
		saved_spinner.set(false);
		previewMode.set(true);
	}

	// Define your save function
	function saveDocument() {
		if (saved) {
			save();
		}
	}

	const getLanguageExtension = () => {
		if (lang === 'html') {
			return html();
		} else if (lang === 'css') {
			return css();
		}
		return javascript();
	};

	function verifyUser() {
		try {
			if ($user.id == $current_data.user_id) {
				previewMode.set(false);
				return true;
			} else {
				// console.log('lier');
				return false;
			}
		} catch (error) {
			// console.log('err');
		}
	}
	function handleContentChange(data) {
		verifyUser();
		current_data.update((cur) => {
			// console.log(cur);
			return { ...cur, code: data };
		});
		handleAutoSave();
	}

	onMount(async () => {
		const customTheme = createTheme();
		const fixedHeightEditor = EditorView.theme({
			'&': { height: '100%' },
			'.cm-scroller': { overflow: 'auto' }
		});

		let changeReview = EditorView.updateListener.of((v) => {
			if (v.docChanged) {
				handleContentChange(v.state.doc.toString());
			}
		});

		editorView = new EditorView({
			parent: editorContainer,
			doc: initialCode,
			extensions: [basicSetup, fixedHeightEditor, getLanguageExtension(), changeReview, customTheme]
		});

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
	<div class="editor-container h-full rounded-xl">
		<div
			class="h-full w-full rounded-xl bg-white p-6 dark:bg-primary"
			bind:this={editorContainer}
		></div>
	</div>
{/if}

<style>
	/* Set the height of the editor container */
	.editor-container {
		height: 100%;
		width: 100%;
	}
</style>
