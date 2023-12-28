<script>
	import { current_data, user, isOwner, SnippetsDescription, showToast } from '$lib/index.js';
	import { consoleOutput, canvasConfig, canvasTags, sassActive } from '$lib/feEditor/store.js';
	import { onDestroy, onMount, tick } from 'svelte';
	import { browser } from '$app/environment';
	import FeCodeEditor from '../../../components/fePlayground/feCodeEditor.svelte';
	import FePlayGroungNav from '../../../components/fePlayground/fePlayGroungNav.svelte';
	import CodeOutput from '../../../components/fePlayground/codeOutput.svelte';
	import Resizable from '../../../components/fePlayground/resizable.svelte';
	import { showModal, showEmbedModal } from '$lib/feEditor/store.js';
	import JsConsole from '../../../components/fePlayground/jsConsole.svelte';
	import EmbedModal from '../../../components/fePlayground/embedModal.svelte';
	import ModalHigh from '$components/fePlayground/modalHigh.svelte';
	import OverlayNav from '../../../components/overlayNav.svelte';
	import SideComponent from '../../../components/fePlayground/editorSets/sideComponent.svelte';

	// console.log(user)

	let mobileDetails;
	if (browser) {
		mobileDetails = window.innerWidth <= 768;
	}

	current_data.set({
		html: '<!-- -->',
		css: '/* */',
		js: '//',
		user_id: 123,
		project_key: 'try',
		description: 'Untitled Canvas',
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
			cssProcessor: false
		},
		tags: []
	});

	function captureIframeOutput(event) {
		if (event.data && event.data.type === 'console') {
			// Handle the console message received from the iframe
			consoleOutput.update((cur) => {
				return [...cur, event.data.message];
			});
		}
	}
	isOwner.set(false);
	onMount(async () => {
		await tick();
		canvasTags.set($current_data.tags);
		canvasConfig.set($current_data.config);
		sassActive.set($current_data.config?.cssProcessor);
		window.addEventListener('message', captureIframeOutput);
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('message', captureIframeOutput);
		}
	});
</script>

<svelte:head>
	<title>{'Try SnippetLand'}</title>

	<!-- Facebook Meta Tags -->
	<meta property="og:title" content={'Try SnippetLand'} />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:title" content={'Try SnippetLand'} />

	<!-- HTML Meta Tags -->
</svelte:head>

<main class="h-screen flex flex-col">
	<FePlayGroungNav ispublic={$current_data.public} />
	<div class="h-full w-full relative overflow-hidden">
		<Resizable>
			<div slot="left" class="h-full w-full">
				<FeCodeEditor initialHTML={'<!--HTML HERE-->'} initialCSS={'/* */'} lang="html" />
			</div>
			<div slot="right" class="w-full h-full relative">
				<CodeOutput />
				<JsConsole />
			</div>
		</Resizable>
		<!-- <div class="absolute top-0 w-[300px] bg-white h-full" /> -->
		<SideComponent />
		{#if $showModal}
			<ModalHigh />
		{/if}
		{#if $showEmbedModal}
			<EmbedModal type={$showModal} />
		{/if}
	</div>
</main>
