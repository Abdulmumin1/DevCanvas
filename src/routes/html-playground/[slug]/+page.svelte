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
</script>

<svelte:head>
	{#if data.isFound}
		<title>{data.details.description}</title>

		<!-- Facebook Meta Tags -->
		<meta property="og:title" content={data.details.description} />

		<!-- Twitter Meta Tags -->
		<meta name="twitter:title" content={data.details.description} />
	{/if}
	<!-- HTML Meta Tags -->
</svelte:head>

<FePlayGroungNav />
<article class="min-h-screen h-screen flex flex-col">
	<div class="relative flex h-full flex-col lg:flex-row">
		<Resizable>
			<div slot="left" class="w-full h-full">
				<FeCodeEditor initialHTML={data.details.html} initialCSS={data.details.css} lang="html" />
			</div>
			<div slot="right" class="w-full h-full">
				<CodeOutput />
			</div>
		</Resizable>
		<!-- <div class="w-full h-full"> -->
		<!-- </div> -->
	</div>
</article>
