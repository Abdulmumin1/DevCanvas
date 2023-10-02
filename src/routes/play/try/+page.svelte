<script>
	import { current_data, user, isOwner, SnippetsDescription, showToast } from '$lib/index.js';
	import { consoleOutput } from '$lib/feEditor/store.js';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import FeCodeEditor from '../../../components/fePlayground/feCodeEditor.svelte';
	import FePlayGroungNav from '../../../components/fePlayground/fePlayGroungNav.svelte';
	import CodeOutput from '../../../components/fePlayground/codeOutput.svelte';
	import Resizable from '../../../components/fePlayground/resizable.svelte';
	import { showModal } from '$lib/feEditor/store.js';
	import Femodal from '../../../components/fePlayground/femodal.svelte';
	import JsConsole from '../../../components/fePlayground/jsConsole.svelte';

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
		description: 'Try Snippetland Playground'
	});

	onMount(() => {
		window.addEventListener('message', function (event) {
			if (event.data && event.data.type === 'console') {
				// Handle the console message received from the iframe
				consoleOutput.update((cur) => {
					return [...cur, event.data.message];
				});
			}
		});
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
	<FePlayGroungNav />
	<div class="h-full w-full relative overflow-hidden">
		<Resizable>
			<div slot="left" class="h-full w-full">
				<FeCodeEditor initialHTML={'<!--HTML HERE-->'} initialCSS={'/* */'} lang="html" />
			</div>
			<div slot="right" class="w-full h-full">
				<CodeOutput />
			</div>
		</Resizable>
		{#if $showModal}
			<Femodal type={$showModal} />
		{/if}
		<JsConsole />
	</div>
</main>
