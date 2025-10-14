<script>
	import { faSpinner } from '@fortawesome/free-solid-svg-icons';
	import { afterUpdate, onDestroy, onMount } from 'svelte';
	import {
		showSave,
		saveData,
		showLoginToSave,
		javascriptStuff,
		showForkTosave,
		editorConfig,
		typescriptActive
	} from '$lib/feEditor/store.js';
	import {
		current_data,
		isOwner,
		user,
		saved_spinner,
		darkModeState,
		wordWrapSetting,
		smallerFontSize,
		formatOnPasteSetting,
		renderIndentGuidesSetting,
		delayPreview,
		autoSavefast
	} from '$lib/index.js';
	import { currentTheme } from '$lib/utils/utils.js';
	import { browser } from '$app/environment';
	import Fa from 'svelte-fa';
	import { EditorView } from '@codemirror/view';
	import { Compartment } from '@codemirror/state';
	import { basicSetup } from 'codemirror';
	import { keymap } from '@codemirror/view';
	import { indentWithTab } from '@codemirror/commands';
	import { javascript } from '@codemirror/lang-javascript';
	import { EditorState } from '@codemirror/state';
	import { createTheme } from '$lib/editorTheme.js';
	import Loader from '../loader.svelte';

	let editorContainer;
	let editorView;
	let loading = true;
	export let lang = 'javascript';

	// Define the initial code content
	export let initialJs = `//`;

	let saved = true;
	let typingTimer; // Timer to track typing
	const delay = 1000; // Adjust the delay as needed (in milliseconds)
	var updateDelayTm;
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
		if (verifyUser()) {
			saveData($current_data, 'js');
		}
		saved = true;
		saved_spinner.set(false);
		showSave.set(true);
	}

	// Define your save function
	function saveDocument() {
		if (saved) {
			save();
		}
	}

	function verifyUser() {
		if ($isOwner) {
			showSave.set(true);
			return true;
		} else if (!$user) {
			showLoginToSave.set(true);
		} else {
			showForkTosave.set(true);
		}
	}
	function handleContentChange(data) {
		verifyUser();

		clearTimeout(updateDelayTm);
		let updateDelay = $delayPreview ? 500 : 0;
		updateDelayTm = setTimeout(() => {
			current_data.update((cur) => {
				// console.log(cur);
				return { ...cur, js: data };
			});
		}, updateDelay);
		if ($autoSavefast) {
			handleAutoSave();
		}
	}

	let lineWrapping = new Compartment();
	let readOnlyCompartment = new Compartment();

	$: {
		let state = $wordWrapSetting;
		if (browser && editorView) {
			editorView.dispatch({
				effects: lineWrapping.reconfigure(!state ? [] : EditorView.lineWrapping)
			});
		}
	}
	$: {
		let active = $typescriptActive;
		console.log(active);
		if (monacoModel) {
			// console.log(monacoModel);
			// let model = monacoModel.getModel();
			// console.log(model);
			if ($typescriptActive) {
				monacoModel.editor.setModelLanguage(model, 'typescript');
				console.log('lang just changed', 'typescript');
			} else {
				monacoModel.editor.setModelLanguage(model, 'javascript');
				console.log('lang just changed', 'javascript');
			}
		}
	}
	onMount(async () => {
		const customTheme = createTheme();
		const fixedHeightEditor = EditorView.theme({
			'&': { height: '100%' },
			'.cm-scroller': { overflow: 'auto' },
			'.cm-content': { 'padding-bottom': '55px', 'padding-right': '20px' }
		});

		let changeReview = EditorView.updateListener.of((v) => {
			if (v.docChanged) {
				handleContentChange(v.state.doc.toString());
			}
		});

		editorView = new EditorView({
			parent: editorContainer,
			doc: initialJs,
			extensions: [
				basicSetup,
				keymap.of([indentWithTab]),
				fixedHeightEditor,
				javascript(),
				changeReview,
				lineWrapping.of(EditorView.lineWrapping),
				readOnlyCompartment.of(EditorState.readOnly.of(false)),
				customTheme
			]
		});

		window.addEventListener('resize', () => {
			if (editorView) {
				editorView.requestMeasure();
			}
		});

		loading = false;

		return () => {
			editorView.destroy();
		};
	});
	// Cleanup when the component is destroyed
	onDestroy(() => {
		// Dispose of the editor to prevent memory leaks
		if (editorView) {
			editorView.destroy();
		}
	});
</script>

{#if loading}
	<div class="flex h-full items-center justify-center">
		<Loader />
	</div>
{:else}
	<div class="editor-container h-full w-full bg-primary" class:bg-secondary-dark={$darkModeState}>
		<div class="h-full w-full" bind:this={editorContainer} />
	</div>
{/if}

<style>
	/* Set the height of the editor container */
	.editor-container {
		height: 100%;
		width: 100%;
	}
</style>
