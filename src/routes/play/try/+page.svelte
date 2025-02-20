<script>
	import { current_data, isOwner, showToast } from '$lib/index.js';
	import { consoleOutput } from '$lib/feEditor/store.js';
	import { setInitialState } from '$lib/feEditor/stateConfig.js';

	import { onDestroy, onMount, tick } from 'svelte';
	import { browser } from '$app/environment';
	import FeCodeEditor from '$components/fePlayground/feCodeEditor.svelte';
	import FePlayGroungNav from '$components/fePlayground/fePlayGroungNav.svelte';
	import CodeOutput from '$components/fePlayground/codeOutput.svelte';
	import Resizable from '$components/fePlayground/resizable.svelte';
	import { showEmbedModal } from '$lib/feEditor/store.js';
	import JsConsole from '$components/fePlayground/jsConsole.svelte';
	import EmbedModal from '$components/fePlayground/embedModal.svelte';
	import { page } from '$app/stores';
	import { setReloadContext, getReload } from '$lib/feEditor/funct.js';
	import SEO from '$components/seoComp.svelte';

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
				<FeCodeEditor initialHTML={'<!--HTML HERE-->'} initialCSS={'/* */'} lang="html" />
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
	</div>
</main>
