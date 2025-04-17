<script>
	import { current_data, user, isOwner, saveData } from '$lib/index.js';
	import { showSave, consoleOutput } from '$lib/feEditor/store.js';
	import { getContext, onDestroy, onMount, setContext } from 'svelte';
	import { browser } from '$app/environment';
	import FeCodeEditor from '$components/fePlayground/feCodeEditor.svelte';
	import FePlayGroungNav from '$components/fePlayground/fePlayGroungNav.svelte';
	import CodeOutput from '$components/fePlayground/codeOutput.svelte';
	import Resizable from '$components/fePlayground/resizable.svelte';
	import { showLoginToSave, showForkTosave, showEmbedModal } from '$lib/feEditor/store.js';
	import JsConsole from '$components/fePlayground/jsConsole.svelte';
	import EmbedModal from '$components/fePlayground/embedModal.svelte';
	import { aibox, aiprompt } from '$lib/feEditor/aiFunctions.js';

	import { setInitialState } from '$lib/feEditor/stateConfig.js';
	import { constructHtml } from '$lib/feEditor/previewUtils.js';
	import debounce from 'lodash.debounce';

	export let data;

	import { setReloadContext, getReload } from '$lib/feEditor/funct.js';
	import FeAiBox from '../../../components/fePlayground/feAIBox.svelte';
	import { fly } from 'svelte/transition';
	import { writable } from 'svelte/store';

	import {PUBLIC_AI_GATEWAY} from '$env/static/public'

	setReloadContext();

	let reload = getReload();

	setContext('generating', writable(false));
	let generating = getContext('generating');

	// console.log(user)

	let mobileDetails;
	if (browser) {
		mobileDetails = window.innerWidth <= 768;
	}
	current_data.set(data.details);
	// $: console.log($user)

	setInitialState(data.details);

	function captureIframeOutput(event) {
		if (event.data && event.data.type === 'console') {
			// Handle the console message received from the iframe
			consoleOutput.update((cur) => {
				return [...cur, event.data.message];
			});
		}
	}

	let messages = [];

	let initialHTML = data.details.html;
	let initialCSS = data.details.css;
	let initialJs = data.details.js;
	let mounted = false;
	$: fetchResponse = true;

	const debouncedSaveMessagesToDB = debounce((data, details) => {
		if (!mounted) return;
		saveData({ messages: data, id: details.id }).then(() => {});
	}, 2000); // adjust delay as needed

	async function promptAI(message) {
		// console.log('fdsfds');

		const debouncedUpdate = debounce((html) => {
			current_data.update((cur) => ({
				...cur,
				html: html.trim()
			}));
		}, 700); // adjust delay as needed

		function findEndTagIndex(htmlBuffer, endTag) {
			const fullIndex = htmlBuffer.indexOf(endTag);
			if (fullIndex !== -1) return fullIndex;

			// Look for partial match at the end of the buffer
			const maxPartialLength = Math.min(endTag.length - 1, htmlBuffer.length);
			for (let i = maxPartialLength; i > 0; i--) {
				const bufferSuffix = htmlBuffer.slice(-i);
				const endTagPrefix = endTag.slice(0, i);
				if (bufferSuffix === endTagPrefix) {
					// Return -2 to indicate partial match found
					return -2;
				}
			}

			return -1; // No match at all
		}
		if ($generating) return;

		generating.set(true);
		// console.log($generating);
		// console.log(messages);
		try {
			let m = {
				messageId: crypto.randomUUID(),
				role: 'user',
				content: message
			};

			messages = [...messages, m];

			const response = await fetch(PUBLIC_AI_GATEWAY, {
				method: 'post',
				body: JSON.stringify(messages)
			});

			if (response.ok) {
				let messageId = crypto.randomUUID();
				const reader = response.body.getReader();
				let decoder = new TextDecoder();
				let insideCustomBlock = false;
				let htmlBuffer = '';
				let result = '';
				const startTag = '<DEVCANVAS_START>';
				const endTag = '</DEVCANVAS_START>';

				try {
					while (fetchResponse) {
						// console.log(fetchResponse, $generating)
						const { done, value } = await reader.read();

						// Move this line outside the loop - we only want to set generating=false when done
						if (done) {
							$generating = false;
							break;
						}

						const chunk = decoder.decode(value);
						result += chunk;
						// console.log(htmlBuffer)
						// Case 1: Not yet inside a custom block but found start tag
						if (!insideCustomBlock && result.includes(startTag)) {
							insideCustomBlock = true;
							// Start collecting just after <DEVCANVAS_START>
							const startIndex = result.indexOf(startTag) + startTag.length;
							htmlBuffer = result.substring(startIndex);
						}

						// Case 2: Already inside a custom block
						else if (insideCustomBlock) {
							htmlBuffer += chunk;

							// Check if we've reached the end tag
							const tempEndIndex = findEndTagIndex(htmlBuffer, endTag);

							if (tempEndIndex >= 0 || tempEndIndex === -2) {
								// We found the end tag

								const currentHTML = htmlBuffer.substring(0, tempEndIndex);
								// Update with the final HTML
								debouncedUpdate(currentHTML);

								// Exit custom block mode
								insideCustomBlock = false;

								// Add text after end tag to result
								// result += htmlBuffer.substring(tempEndIndex + endTag.length);
								initialHTML = currentHTML;

								htmlBuffer = '';
							} else {
								// No end tag yet, update with what we have so far
								debouncedUpdate(htmlBuffer);
								initialHTML = htmlBuffer;
							}
						}

						// Update the message regardless of custom block status
						const aiResponse = {
							messageId,
							role: 'assistant',
							content: result
						};

						messages = messages.some((msg) => msg.messageId === messageId)
							? messages.map((msg) =>
									msg.messageId === messageId ? { ...msg, content: result } : msg
								)
							: [...messages, aiResponse];
					}

					fetchResponse = true;

					// After done, set final message
				} catch (error) {
					console.error('Error processing stream:', error);
					$generating = false;
				}
			}
		} catch (error) {
			// console.log(error);
		} finally {
			$generating = false;
		}
	}

	async function handlePrompt(e) {
		let prompt = e.detail;
		// console.log(messages)
		// return;
		await promptAI(prompt.message);
	}

	async function handleStop(e) {
		let data = e.detail;
		// console.log(messages)
		// return;
		fetchResponse = false;
		$generating = false;
	}

	$: debouncedSaveMessagesToDB(messages, data.details);

	onMount(async () => {
		// getUser()
		showSave.set(false);
		setTimeout(() => {
			if ($user) {
				if ($user.id == $current_data.user_id && $current_data.user_id != null) {
					isOwner.set(true);
					// console.log('it is set to true');
				} else {
					isOwner.set(false);
				}
			}
		}, 1000);
		let html = await constructHtml(data.details);
		const startTags = '<DEVCANVAS_START>';
		const endTags = '</DEVCANVAS_START>';
		let m = [
			{
				messageId: 'DEVCANVAS_INITIAL_MESSAGE',
				role: 'user',
				content: 'This is my current code'
			},
			{
				messageId: 'DEVCANVAS_INITIAL_CODE',
				role: 'user',
				content: `${startTags}${html}${endTags}`
			}
		];
		try {
			console.log(data.details.messages)

			let storedChat = data.details.messages;

			if (typeof(storedChat) == 'string'){
				throw new Error()
			}

			messages = storedChat.length ? storedChat : [...messages, ...m];
		} catch {
			messages = [...messages, ...m];
		}

		mounted = true;
		window.addEventListener('message', captureIframeOutput);
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('message', captureIframeOutput);
		}
	});

	showForkTosave.set(false);
	showLoginToSave.set(false);
</script>

<div class="flex h-screen flex-col">
	<header class="w-full">
		<FePlayGroungNav ispublic={data.details.public} />
	</header>
	<div class="relative h-full w-full overflow-hidden">
		<Resizable>
			<div slot="left" class="h-full w-full">
				<FeCodeEditor bind:initialHTML bind:initialCSS lang="html" />
			</div>
			<div slot="right" class="relative h-full w-full bg-white">
				{#key $reload}
					<CodeOutput code={$current_data.html} css={$current_data.css} js={$current_data.js} />
					<JsConsole />
				{/key}
			</div>
		</Resizable>
		{#if $showEmbedModal}
			<EmbedModal />
		{/if}

		{#if $aibox}
			<div
				transition:fly={{ y: 40, duration: 200 }}
				class="fixed bottom-12 left-1/2 -translate-x-1/2 transform"
			>
				<FeAiBox on:ai={handlePrompt} on:stop={handleStop} {messages} />
			</div>
		{/if}
	</div>
</div>
