<script>
	import { current_data, user, isOwner } from '$lib/index.js';
	import { showSave, consoleOutput } from '$lib/feEditor/store.js';
	import { onDestroy, onMount } from 'svelte';
	import { browser } from '$app/environment';
	import FeCodeEditor from '$components/fePlayground/feCodeEditor.svelte';
	import FePlayGroungNav from '$components/fePlayground/fePlayGroungNav.svelte';
	import CodeOutput from '$components/fePlayground/codeOutput.svelte';
	import Resizable from '$components/fePlayground/resizable.svelte';
	import { showLoginToSave, showForkTosave, showEmbedModal } from '$lib/feEditor/store.js';
	import JsConsole from '$components/fePlayground/jsConsole.svelte';
	import EmbedModal from '$components/fePlayground/embedModal.svelte';

	import { setInitialState } from '$lib/feEditor/stateConfig.js';

	export let data;

	import { setReloadContext, getReload } from '$lib/feEditor/funct.js';

	setReloadContext();

	let reload = getReload();

	// console.log(user)

	let mobileDetails;
	if (browser) {
		mobileDetails = window.innerWidth <= 768;
	}
	current_data.set(data.details);
	setInitialState(data.details);

	function captureIframeOutput(event) {
		if (event.data && event.data.type === 'console') {
			// Handle the console message received from the iframe
			consoleOutput.update((cur) => {
				return [...cur, event.data.message];
			});
		}
	}
	onMount(() => {
		// getUser()
		showSave.set(false);
		setTimeout(() => {
			if ($user) {
				if ($user.id == $current_data.user_id && $current_data.user_id != null) {
					isOwner.set(true);
					console.log('it is set to true');
				} else {
					isOwner.set(false);
				}
			}
		}, 1000);

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
				<FeCodeEditor initialHTML={data.details.html} initialCSS={data.details.css} lang="html" />
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
	</div>
</div>
