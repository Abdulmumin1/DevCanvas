<script>
	import { EditorView } from '@codemirror/view';
	import { Compartment } from '@codemirror/state';
	import { basicSetup } from 'codemirror';
	import { keymap } from '@codemirror/view';
	import { indentWithTab } from '@codemirror/commands';
	// import { formatExtension } from '@codemirror/formatting';
	// import { EditorState } from '@codemirror/state';
	import { javascript } from '@codemirror/lang-javascript'; // Or other language extension
	import { html } from '@codemirror/lang-html'; // Or other language extension
	import { css } from '@codemirror/lang-css'; // Or other language extension

	// import { onDark } from '@codemirror/theme-one-dark';
	// import * as prettier from 'prettier';
	// import prettierPluginHtml from 'prettier/parser-html';
	// import prettierPluginBabel from 'prettier/parser-babel';
	// import prettierPluginCss from 'prettier/parser-postcss';

	import { onMount } from 'svelte';
	import { coolGlow } from 'thememirror';
	import {
		showSave,
		saveData,
		showLoginToSave,
		showForkTosave,
		formatCode
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
	import { EditorState } from '@codemirror/state';
	import { browser } from '$app/environment';
	// ... (reactive state and logic for the editor)

	let editorView;
	let container;

	export let code;
	export let lang;
	let updateDelayTm;
	let typingTimer;
	let delay = 1000;
	let saved = true;

	const langFunction = () => {
		if (lang == 'html') {
			return html();
		} else if (lang == 'css') {
			return css();
		} else {
			return javascript();
		}
	};

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

	async function save() {
		saved = false;
		saved_spinner.set(true);
		if (verifyUser()) {
			if (lang == 'html') {
				saveData($current_data, 'html');
			} else if (lang == 'css') {
				saveData($current_data, 'css');
			} else if (lang == 'javascript') {
				saveData($current_data, 'js');
			}
		}
		saved = true;
		saved_spinner.set(false);
		showSave.set(true);
	}

	async function formatter(view) {
		const cCode = view.state.doc.toString();
		// const formattedCode = await prettier.format(cCode, {
		// 	parser: getParser(),
		// 	plugins: [prettierPluginHtml, prettierPluginBabel, prettierPluginCss]
		// });

		// view.dispatch({
		// 	changes: {
		// 		from: 0,
		// 		to: view.state.doc.length,
		// 		insert: formattedCode
		// 	}
		// });
	}

	function getParser() {
		if (lang == 'html') return 'html';
		else if (lang == 'css') return 'css';
		else if (lang == 'javascript') return 'babel';
		return 'html';
	}

	function handleAutoSave() {
		clearTimeout(typingTimer); // Clear the previous timer

		typingTimer = setTimeout(function () {
			// This function will run after the delay (user has stopped typing)
			save();
		}, delay);
	}

	function handleContentChange(data, lang) {
		verifyUser();
		clearTimeout(updateDelayTm);
		let updateDelay = $delayPreview ? 500 : 0;
		updateDelayTm = setTimeout(() => {
			if (lang == 'html') {
				current_data.update((cur) => {
					// console.log(cur);
					return { ...cur, html: data };
				});
			} else if (lang == 'css') {
				current_data.update((cur) => {
					// console.log(cur);
					return { ...cur, css: data };
				});
			} else if (lang == 'javascript') {
				current_data.update((cur) => {
					// console.log(cur);
					return { ...cur, js: data };
				});
			}
		}, updateDelay);

		if ($autoSavefast) {
			handleAutoSave();
		}
	}

	let lineWrapping = new Compartment();

	$: {
		let state = $wordWrapSetting;
		if (browser && editorView) {
			// console.log(state);
			editorView.dispatch({
				effects: lineWrapping.reconfigure(!state ? [] : EditorView.lineWrapping)
			});
			// console.log(editorView.state.doc.extension);
		}
	}

	$: {
		if ($formatCode && editorView) {
			console.log('formatting code', lang);
			formatAsync();
			// formatCode.set(false);
			// setTimeout()
			// tick().then(setTimeout(formatCode.set(false), 2000));
		}
	}

	function formatAsync() {
		formatter(editorView).then(() => {});
	}

	onMount(() => {
		//   const container = document.querySelector('.codemirror-editor'); // Select container element
		const fixedHeightEditor = EditorView.theme({
			'&': { height: '100%' },
			// '.cm-content, .cm-gutter': { minHeight: '100%' },
			'.cm-scroller': { overflow: 'auto' },
			'.cm-content': { 'padding-bottom': '55px', 'padding-right': '20px' },
			'.cm-scroller::-webkit-scrollbar-track': { 'background-color': 'black' }
		});
		// '.cm-scroller::-webkit-scrollbar-thumb': { 'box-shadow': '4px 0px 0px 4px #22c55e inset' }

		let changeReview = EditorView.updateListener.of((v) => {
			if (v.docChanged) {
				// Document changed
				// console.log(v.state.doc.toString());
				handleContentChange(v.state.doc.toString(), lang);
			}
		});

		editorView = new EditorView({
			parent: container,
			doc: `${code}`, // Bind the initial code
			extensions: [
				basicSetup,
				keymap.of([indentWithTab]),
				fixedHeightEditor,
				langFunction(),
				changeReview,
				lineWrapping.of(EditorView.lineWrapping),
				coolGlow
			] // Extensions
		});

		// formatCode.subscribe(())
	});
</script>

<div bind:this={container} style="height: 100%;" class="bc" />

<!-- <style></style> -->

<style>
	/* Hide horizontal scrollbar */
	.cm-scroller::-webkit-scrollbar-track {
		background-color: black !important;
	}

	.bc {
		--scroll-bg: #2263c593;
	}
</style>
