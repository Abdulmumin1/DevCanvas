<script>
	import { current_data, user, isOwner, SnippetsDescription, showToast } from '$lib/index.js';
	import { showSave } from '$lib/feEditor/store.js';
	import { onMount } from 'svelte';
	import Toast from '../../../components/toast.svelte';
	import { browser } from '$app/environment';
	import FeCodeEditor from '../../../components/fePlayground/feCodeEditor.svelte';
	import FePlayGroungNav from '../../../components/fePlayground/fePlayGroungNav.svelte';
	import CodeOutput from '../../../components/fePlayground/codeOutput.svelte';
	import Resizable from '../../../components/fePlayground/resizable.svelte';
	import { showLoginToSave, showForkTosave } from '$lib/feEditor/store.js';

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
	<div class="h-full w-full">
		<Resizable>
			<div slot="left" class="h-full w-full">
				<FeCodeEditor initialHTML={'<!--HTML HERE-->'} initialCSS={'/* */'} lang="html" />
			</div>
			<div slot="right" class="w-full h-full">
				<CodeOutput />
			</div>
		</Resizable>
	</div>
</main>
