<script>
	import { current_data, isOwner, showToast } from '$lib/stores/index.js';
	import { consoleOutput } from '$lib/stores/playground.js';
	import { setInitialState } from '$lib/playground/stateConfig.js';
	import { aibox, aiprompt } from '$lib/playground/aiFunctions.js';

	import { getContext, onDestroy, onMount, setContext, tick } from 'svelte';
	import { browser } from '$app/environment';
	import FeCodeEditor from '$components/features/playground/feCodeEditor.svelte';
	import FePlayGroungNav from '$components/features/playground/fePlayGroungNav.svelte';
	import CodeOutput from '$components/features/playground/codeOutput.svelte';
	import Resizable from '$components/features/playground/resizable.svelte';
	import JsConsole from '$components/features/playground/jsConsole.svelte';
	import EmbedModal from '$components/features/playground/embedModal.svelte';
	import SEO from '$components/ui/seoComp.svelte';
	import FeAiBox from '../../../components/features/playground/feAIBox.svelte';
	import { writable } from 'svelte/store';
	import { fly } from 'svelte/transition';
	import { env } from '$env/dynamic/public';

	setReloadContext();

	let reload = getReload();

	let mobileDetails;
	if (browser) {
		mobileDetails = window.innerWidth <= 768;
	}

	let titleParam = $page.url.searchParams.get('name');
	// console.log(titleParam);
	let try_data = {
		html: '<!-- -->',
		css: '/* */',
		js: '//',
		user_id: 123,
		project_key: 'try',
		description: titleParam ?? 'Untitled Project',
		public: true,
		plugins: [
			{
				css: {
					tailwind: false,
					bootstrap: false,
					fontawesome: false,
					materialicons: false,
					googlefonts: false,
					bulma: false
				},
				js: {
					animejs: false,
					gsap: false,
					motionone: false,
					threejs: false,
					velocity: false,
					popmotion: false,
					scrollreveal: false
				}
			}
		],
		config: {
			tags: [],
			cssProcessor: false,
			babelActive: false,
			typescriptActive: false,
			userImportedJS: []
		},
		tags: []
	};
	current_data.set(try_data);

	function captureIframeOutput(event) {
		if (event.data && event.data.type === 'console') {
			// Handle the console message received from the iframe
			consoleOutput.update((cur) => {
				return [...cur, event.data.message];
			});
		}
	}
	isOwner.set(false);

	export let data;
	let initialHTML = '<!-- -->';
	let initialCSS = '/* */';
	let initialJs = '//';
	let fetchResponse = true;

	setContext('generating', writable(false));
	let generating = getContext('generating');

	// $: console.log(data)

	let messages = [
		{
			messageId: crypto.randomUUID(),
			role: 'user',
			content: 'create nice interactive button that says submit '
		}
	];

	async function promptAI(message) {
		// console.log('fdsfds');
		if ($generating) return;

		generating.set(true);
		// console.log($generating);

		try {
			let m = {
				messageId: crypto.randomUUID(),
				role: 'user',
				content: message
			};

			messages = [...messages, m];

			const response = await fetch(env.PUBLIC_AI_GATEWAY, {
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

							// Update result to only include content before the custom block
							result = result.substring(0, result.indexOf(startTag));
						}
						// Case 2: Already inside a custom block
						else if (insideCustomBlock) {
							htmlBuffer += chunk;

							// Check if we've reached the end tag
							const tempEndIndex = htmlBuffer.indexOf(endTag);
							// console.log(result)
							if (tempEndIndex !== -1) {
								// We found the end tag
								const currentHTML = result.substring(0, tempEndIndex);
								// Update with the final HTML
								current_data.update((cur) => ({
									...cur,
									html: currentHTML.trim()
								}));

								// Exit custom block mode
								insideCustomBlock = false;

								// Add text after end tag to result
								result += htmlBuffer.substring(tempEndIndex + endTag.length);
								initialHTML = htmlBuffer;

								htmlBuffer = '';
							} else {
								// No end tag yet, update with what we have so far
								current_data.update((cur) => ({
									...cur,
									html: htmlBuffer.trim()
								}));
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
			console.log(error);
		} finally {
			$generating = false;
		}
	}

	async function handlePrompt(e) {
		let prompt = e.detail;
		await promptAI(prompt.message);
	}

	async function handleStop(e) {
		let data = e.detail;
		// console.log(messages)
		// return;
		fetchResponse = false;
		$generating = false;
	}

	onMount(async () => {
		await tick();
		setInitialState($current_data);
		window.addEventListener('message', captureIframeOutput);

		// // Attach the beforeunload event
		// window.addEventListener('beforeunload', function (event) {
		// 	if (try_data != $current_data) {
		// 		// Standard for most browsers
		// 		event.returnValue = 'You have unsaved changes. Are you sure you want to leave?';

		// 		// For some older browsers
		// 		return 'You have unsaved changes. Are you sure you want to leave?';
		// 	}
		// });

		// await promptAI()

		setTimeout(() => {
			showToast.set({ message: 'Canvas not saved, Click save.', duration: 4000 });
		}, 1000);
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('message', captureIframeOutput);
		}
	});
</script>

<svelte:head>
	<SEO
		title="Try DevCanvas"
		description="Online html/css/js sandbox"
		url="https://devcanvas.art/explore"
	/>
</svelte:head>

<main class="flex h-screen flex-col">
	<FePlayGroungNav ispublic={$current_data.public} />
	<div class="relative h-full w-full flex-1 overflow-hidden">
		<Resizable>
			<div slot="left" class="h-full w-full">
				<FeCodeEditor bind:initialHTML bind:initialCSS lang="html" />
			</div>
			<div slot="right" class="relative h-full w-full bg-white">
				{#key $reload}
					<CodeOutput />
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
</main>
