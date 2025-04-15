<script>
	import { afterUpdate, onDestroy, onMount } from 'svelte';
	import { browser } from '$app/environment';
	import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
	import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
	import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
	import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
	import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

	import { currentTheme } from '$lib/utils/utils.js';
	import {
		showSave,
		saveData,
		showLoginToSave,
		showForkTosave,
		editorConfig,
		sassActive
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
	import Loader from '../loader.svelte';

	let editorContanier;
	let editor;
	let loading = true;
	export let lang = 'css';

	// Define the initial code content
	export let initialCSS = `/* css here */`;
	let monacoModel;
	let model;

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
			saveData($current_data, 'css');
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
				return { ...cur, css: data };
			});
		}, updateDelay);
		if ($autoSavefast) {
			handleAutoSave();
		}
	}

	function setEditorTheme() {
		const theme = $darkModeState ? 'newTheme' : 'vs-code'; // Adjust theme names accordingly

		// Set the theme in Monaco Editor
		try {
			monacoModel.editor.setTheme(theme);
		} catch (error) {
			console.log(error);
		}
	}

	$: {
		if (browser && editor) {
			let value = $wordWrapSetting ? 'on' : 'off';
			editor.updateOptions({ wordWrap: value });
			// console.log(value);
		}
	}

	$: {
		if (browser && editor) {
			let value = $smallerFontSize;
			if (value) {
				editor.updateOptions({ fontSize: 14 });
			} else {
				editor.updateOptions({ fontSize: 16 });
			}
			// console.log(value);
		}
	}

	$: {
		if (browser && editor) {
			let value = $formatOnPasteSetting;

			editor.updateOptions({ formatOnPaste: value });

			// console.log(value);
		}
	}

	$: {
		if (browser && editor) {
			let value = $renderIndentGuidesSetting;

			editor.updateOptions({ renderIndentGuides: value });

			// console.log(value);
		}
	}

	$: {
		let active = $sassActive;
		// console.log(active);
		if (monacoModel) {
			// console.log(monacoModel);
			// let model = monacoModel.getModel();
			// console.log(model);
			if ($sassActive) {
				monacoModel.editor.setModelLanguage(model, 'scss');
				// console.log('lang just changed', 'SCSS');
			} else {
				monacoModel.editor.setModelLanguage(model, 'css');
				// console.log('lang just changed', 'CSS');
			}
		}
	}

	onMount(async () => {
		self.MonacoEnvironment = {
			getWorker: function (_moduleId, label) {
				if (label === 'json') {
					return new jsonWorker();
				}
				if (label === 'css' || label === 'scss' || label === 'less') {
					return new cssWorker();
				}
				if (label === 'html' || label === 'handlebars' || label === 'razor') {
					return new htmlWorker();
				}
				if (label === 'typescript' || label === 'javascript') {
					return new tsWorker();
				}
				return new editorWorker();
			}
		};
		import('monaco-editor').then((monaco) => {
			monacoModel = monaco;
			monacoModel.editor.defineTheme('myTheme', currentTheme);
			// Use monaco here...
			setEditorTheme();
			// Initialize the editor
			editor = monacoModel.editor.create(editorContanier, editorConfig);
			// Register the CSS language with Monaco Editor
			monacoModel.languages.register({
				id: 'css'
			});

			// Import and configure the emmet-monaco-es package
			import('emmet-monaco-es').then((emmet) => {
				const dispose = emmet.emmetCSS(
					// monaco-editor it self. If not provided, will use window.monaco instead.
					// This could make the plugin support both ESM and AMD loaded monaco-editor
					monacoModel
					// languages needs to support html markup emmet, should be lower case.
				);
			});

			// if ($darkModeState) {
			// 	monaco.editor.setTheme('myTheme');
			// }
			// Attach an event listener for changes in the code
			editor.onDidChangeModelContent(() => {
				try {
					// console.log(editor.getValue());
					handleContentChange(editor.getValue());
				} catch (err) {
					// console.log(err);
				}
			});
			var saveAction = {
				id: 'saveAction',
				label: 'Save',
				keybindings: [
					monacoModel.KeyMod.CtrlCmd | monacoModel.KeyCode.KeyS // Ctrl + S
				],
				precondition: null,
				keybindingContext: null,
				contextMenuGroupId: 'navigation',
				contextMenuOrder: 1.5,
				run: function (ed, editor, context) {
					// Prevent the default browser behavior (e.g., save dialog)
					// Define the behavior of the save action here
					saveDocument(); // Call your save function here
				}
			};

			// // Register a completion item provider for HTML
			// monaco.languages.registerCompletionItemProvider('html', {
			// 	provideCompletionItems: (model, position) => {
			// 		return {
			// 			suggestions: customTags(monaco)
			// 		};
			// 	}
			// });

			editor.addAction(saveAction);

			model = monacoModel.editor.createModel(initialCSS, lang);

			editor.setModel(model);

			// Format the HTML code
			var formatAction = editor.getAction('editor.action.formatDocument');
			formatAction.run().then(function () {
				// The code has been formatted
			});
		});

		window.addEventListener('resize', () => {
			if (editor) {
				editor.layout();
			}
		});

		loading = false;
		editor.updateOptions({ tabSize: 1 });

		return () => {
			editor.dispose();
		};
	});
	// Cleanup when the component is destroyed
	onDestroy(() => {
		// Dispose of the editor to prevent memory leaks
		if (editor) {
			editor.dispose();
		}
	});

	afterUpdate(() => {
		setEditorTheme();
	});
</script>

{#if loading}
	<div class="flex h-full items-center justify-center">
		<Loader />
	</div>
{:else}
	<div class="editor-container h-full w-full bg-primary" class:bg-secondary-dark={$darkModeState}>
		<div class="h-full w-full" bind:this={editorContanier} />
	</div>
{/if}

<style>
	/* Set the height of the editor container */
	.editor-container {
		height: 100%;
		width: 100%;
	}
</style>
