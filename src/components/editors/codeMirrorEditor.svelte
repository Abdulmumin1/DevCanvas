<script>
	import { run } from 'svelte/legacy';

	import { EditorView } from '@codemirror/view';
	import { Compartment } from '@codemirror/state';
	import { basicSetup } from 'codemirror';
	import { keymap } from '@codemirror/view';
	import { indentWithTab } from '@codemirror/commands';
	import { javascript } from '@codemirror/lang-javascript'; // Or other language extension
	import { html } from '@codemirror/lang-html'; // Or other language extension
	import { css } from '@codemirror/lang-css'; // Or other language extension
	import { editorFontSize } from '$lib/config/settings.js';

	import { getContext, onMount } from 'svelte';
	import { page } from '$app/stores';

	import {
		showSave,
		saveSingle,
		showLoginToSave,
		showForkTosave,
		formatCode
	} from '$lib/stores/playground.js';
	import {
		current_data,
		isOwner,
		user,
		saved_spinner,
		wordWrapSetting,
		delayPreview,
		autoSavefast
	} from '$lib/stores/index.js';
	import { EditorState } from '@codemirror/state';
	import { browser } from '$app/environment';
	import { createTheme } from '$lib/config/editorTheme.js';
	// ... (reactive state and logic for the editor)
	let editorView = $state();
	let container = $state();

	import js_beautify from 'js-beautify';

	let { code = $bindable(), lang } = $props();

	let lockEditor = getContext('generating');
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
				await saveSingle($page.data.supabase, $current_data.html, 'html', $current_data.id);
			} else if (lang == 'css') {
				await saveSingle($page.data.supabase, $current_data.css, 'css', $current_data.id);
			} else if (lang == 'javascript') {
				await saveSingle($page.data.supabase, $current_data.js, 'js', $current_data.id);
			}
		}
		saved = true;
		saved_spinner.set(false);
		showSave.set(false);
	}

	run(() => {
		if (code && editorView) {
			editorView.dispatch({
				changes: {
					from: 0,
					to: editorView.state.doc.length,
					insert: code.length > 200 ? `${code}\n\n\n` : code
				}
			});

			const end = editorView.state.doc.length;
			editorView.dispatch({
				selection: { anchor: end },
				scrollIntoView: true
			});
		}
	});
	function toggleReadOnly(isReadOnly) {
		// console.log(isReadOnly	)
		if (editorView) {
			editorView.dispatch({
				effects: readOnlyCompartment.reconfigure(EditorState.readOnly.of(isReadOnly))
			});
		}
	}

	run(() => {
		toggleReadOnly($lockEditor);
	});
	async function formatter(view) {
		const options = { indent_size: 2 };
		const dataObj = view.state.doc.toString();
		// console.log(dataObj, options, lang);

		if (lang == 'html') {
			let beatifulHtml = js_beautify.html(dataObj, options);
			view.dispatch({
				changes: {
					from: 0,
					to: view.state.doc.length,
					insert: beatifulHtml
				}
			});
		} else if (lang == 'css') {
			let beatifulCSS = js_beautify.css(dataObj, options);
			view.dispatch({
				changes: {
					from: 0,
					to: view.state.doc.length,
					insert: beatifulCSS
				}
			});
		} else if (lang == 'javascript') {
			let beatifulJS = js_beautify.js(dataObj, options);
			view.dispatch({
				changes: {
					from: 0,
					to: view.state.doc.length,
					insert: beatifulJS
				}
			});
		}
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
	const readOnlyCompartment = new Compartment();

	run(() => {
		let state = $wordWrapSetting;
		if (browser && editorView) {
			// console.log(state);
			editorView.dispatch({
				effects: lineWrapping.reconfigure(!state ? [] : EditorView.lineWrapping)
			});
			// console.log(editorView.state.doc.extension);
		}
	});

	function handleformat(e) {
		let details = e.detail;

		if (details.lang == lang || details.lang == 'all') {
			formatter(editorView).then(() => {});
		}
	}

	function handleCodeSwap(e) {
		if ($lockEditor) return;
		let details = e.detail;
		let update = details.code;
		if (details.lang == lang && update) {
			code = update;
		}
	}

	onMount(async () => {
		// console.log(js_beautify.html);
		const customTheme = createTheme();
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
				readOnlyCompartment.of(EditorState.readOnly.of(false)),
				customTheme
			] // Extensions
		});

		window.addEventListener('codeSwap', handleCodeSwap);
		window.addEventListener('formatCode', handleformat);

		return () => {
			editorView.destroy();
			window.removeEventListener('myCustomEvent', handleCodeSwap);
			window.removeEventListener('formatCode', handleformat);
		};
		// formatCode.subscribe(())
	});

	let fontSize = $derived($editorFontSize);
</script>

<svelte:head></svelte:head>

<div
	bind:this={container}
	style:--editorSize="{$editorFontSize}px"
	style="height: 100%;"
	class="bc {$lockEditor && 'cursor-progress'}"
></div>

<!-- <style></style> -->

<style>
	/* Hide horizontal scrollbar */
	.cm-scroller::-webkit-scrollbar-track {
		background-color: black !important;
	}

	.bc {
		--scroll-bg: #7dd4fc25;
	}
	:global(.cm-content) {
		font-size: var(--editorSize) !important;
	}
</style>
