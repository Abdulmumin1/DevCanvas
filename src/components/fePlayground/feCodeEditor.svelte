<script>
	import { faSpinner } from '@fortawesome/free-solid-svg-icons';
	import { afterUpdate, onDestroy, onMount } from 'svelte';
	import {
		current_data,
		previewMode,
		user,
		saved_spinner,
		saveData,
		darkModeState
	} from '$lib/index.js';
	import { browser } from '$app/environment';
	import Fa from 'svelte-fa';

	let editorContanier;
	let editor;
	let loading = true;
	export let lang = 'javascript';

	// Define the initial code content
	export let initialCode = `function greet(name) {
	return 'Hello, ' + name + '!';
}`;
	let editorConfig;
	let monacoModel;
	if (browser) {
		editorConfig = {
			value: initialCode,
			language: lang,
			fontSize: 15,
			automaticLayout: true,
			emmet: {
				enabled: true // Enable Emmet support
			},
			minimap: { enabled: false },
			...(window.innerWidth <= 600 && { fontSize: 11, wordWrap: 'on' })
		};
	}

	let saved = true;

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

	function verifyUser() {
		try {
			if ($user.id == $current_data.user_id) {
				previewMode.set(false);
				return true;
			} else {
				console.log('lier');
				return fals;
			}
		} catch (error) {
			console.log('err');
		}
	}
	function handleContentChange(data) {
		verifyUser();
		current_data.update((cur) => {
			// console.log(cur);
			return { ...cur, html: data };
		});
	}

	function setEditorTheme() {
		const theme = $darkModeState ? 'myTheme' : 'vs-code'; // Adjust theme names accordingly

		// Set the theme in Monaco Editor
		try {
			monacoModel.editor.setTheme(theme);
		} catch (error) {
			console.log(error);
		}
	}

	onMount(() => {
		import('monaco-editor').then((monaco) => {
			monacoModel = monaco;
			monacoModel.editor.defineTheme('myTheme', {
				base: 'vs-dark',
				inherit: true,
				rules: [],
				colors: {
					'editor.foreground': '#f4eded',
					'editor.background': '#191919',
					'editorCursor.foreground': '#38bef7',
					'editor.lineHighlightBackground': '#0e0e0e50',
					'editorLineNumber.foreground': '#38bef7',
					'editor.selectionBackground': '#38BEF710',
					'editor.inactiveSelectionBackground': '#38BEF720'
				}
			});
			// Use monaco here...
			setEditorTheme();
			// Initialize the editor
			editor = monacoModel.editor.create(editorContanier, editorConfig);
			// Register the HTML language with Monaco Editor
			monacoModel.languages.register({
				id: 'html'
			});

			// Import and configure the emmet-monaco-es package
			import('emmet-monaco-es').then((emmet) => {
				console.log(emmet);
				const dispose = emmet.emmetHTML(
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
				} catch {
					console.log('err');
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
		});

		window.addEventListener('resize', () => {
			if (editor) {
				editor.layout();
			}
		});
		loading = false;
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
	<div class="h-full flex justify-center items-center">
		<Fa icon={faSpinner} class="animate-spin text-2xl" />
	</div>
{:else}
	<div class="editor-container h-full rounded-xl" class:bg-secondary-dark={$darkModeState}>
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
