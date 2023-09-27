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

	export let data;

	// console.log(user)

	let mobileDetails;
	if (browser) {
		mobileDetails = window.innerWidth <= 768;
	}
	current_data.set(data.details);

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
	});

	showForkTosave.set(false);
	showLoginToSave.set(false);
</script>

<svelte:head>
	<title>{$current_data.description}</title>

	<!-- Facebook Meta Tags -->
	<meta property="og:title" content={data.details.description} />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:title" content={data.details.description} />

	<!-- HTML Meta Tags -->
</svelte:head>

<div class="h-screen flex flex-col">
	<FePlayGroungNav />
	<div class="h-full w-full overflow-hidden">
		<Resizable>
			<div slot="left" class="h-full w-full">
				<FeCodeEditor initialHTML={data.details.html} initialCSS={data.details.css} lang="html" />
			</div>
			<div slot="right" class="w-full h-full">
				<CodeOutput code={$current_data.html} css={$current_data.css} js={$current_data.js} />
			</div>
		</Resizable>
	</div>
</div>
