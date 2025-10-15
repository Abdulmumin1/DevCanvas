<script>
	import { onMount } from 'svelte';
	import ShareAct from '$components/ui/shareAct.svelte';

	let iframe = null;
	let link = null;
	export let data;
	onMount(() => {
		link = window.location.href;
	});
</script>

<svelte:head>
	<title>{data.details.description}</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<iframe
	class="h-[100dvh] w-full bg-white"
	src="/output/compile/{data.details.project_key}"
	title="preview"
	frameborder="0"
	bind:this={iframe}
/>

<div class="fixed bottom-0 right-0 m-2 flex items-center justify-center gap-2">
	<a href="./" class=" flex items-center gap-2 rounded-xl bg-secondary-dark p-2">
		<span
			><img
				height="16px"
				width="16px"
				alt=""
				style="filter: grayscale(100);"
				src="/logo.svg"
			/></span
		> <span class="hidden text-gray-100 md:block">Editor View</span>
	</a>

	<div class="rounded-full bg-secondary-dark p-3 text-gray-100">
		<ShareAct {link} title={data.details.description} />
	</div>

	<!-- <ShareDropdown /> -->
</div>
