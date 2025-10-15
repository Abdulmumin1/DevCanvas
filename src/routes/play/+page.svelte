<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import NavWrapper from '$components/features/snippets/navWrapper.svelte';
	import { user } from '$lib/stores/index.js';
	import SEO from '$components/ui/seoComp.svelte';

	let projectName = 'Untitled Project';
	let currentTip = '';
	let tipIndex = 0;

	const tips = [
		'CSS: Because making divs do what you want is like herding cats',
		"JavaScript: Where 'undefined is not a function' is a way of life",
		'Responsive design: Making your website look good on a smartwatch, because why not?'
		// ... (other tips)
	];

	onMount(() => {
		updateTip();
		setInterval(updateTip, 10000); // Change tip every 10 seconds
	});

	function updateTip() {
		tipIndex = (tipIndex + 1) % tips.length;
		currentTip = tips[tipIndex];
	}

	// async function createProject() {
	// 	busy = true;
	// 	let formData = new FormData();

	// 	formData.append('project_name', '//');

	// 	const response = await fetch('/db/fe/create', {
	// 		method: 'POST',
	// 		body: formData
	// 	});

	// 	// console.log('response', response.json());
	// 	if (response.ok) {
	// 		let d = await response.json();
	// 		// invalidateAll();
	// 		if (demo) {
	// 			goto(d.url);
	// 		} else {
	// 			window.location.href = d.url;
	// 		}
	// 		// window.l
	// 	} else {
	// 		if (response.status == 400) {
	// 			goto(handleRedirectURL($page.url));
	// 		}
	// 	}
	// }

	async function handleCreateEditor() {
		// console.log(`Creating new project: ${projectName}`);

		await goto(`play/try?name=${projectName}`);
	}
</script>

<svelte:head>
	<!-- <title>Exp	lore</title> -->
	<!--
	<meta
		property="og:description"
		content="Library of Awesome frontend creations for your inspiration!"
	/> -->
	<SEO
		title="Create - Devcanvas"
		description="Library of Awesome frontend creations for your inspiration!"
		url="https://devcanvas.art/play"
	/>
</svelte:head>

<NavWrapper>
	<div
		class="flex h-[90vh] w-full items-end overflow-hidden bg-gradient-to-br p-8 pt-20 dark:bg-primary md:items-start md:pt-36"
	>
		<div class="flex w-full flex-col gap-12">
			<div class="mx-auto flex items-center gap-2 text-2xl md:text-4xl">
				<span
					class="flex aspect-square h-10 items-center justify-center rounded-full bg-gradient-to-r from-sky-400 to-sky-300 text-3xl dark:text-black md:h-16 md:text-5xl"
					>+</span
				> <span class="dark:text-white">Create new Canvas</span>
			</div>
			<div
				class="mx-auto flex w-full max-w-4xl flex-col rounded-[50px] bg-neutral-100 p-6 dark:bg-secondary-dark"
			>
				{#if $user}
					<form method="post" action="/db/fe/create" class=" flex gap-2">
						<input
							type="text"
							bind:value={projectName}
							placeholder="Project Name"
							name="project_name"
							class="w-full rounded-3xl border-none bg-white px-4 py-3 text-lg text-black placeholder-black placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-sky-300 dark:bg-primary dark:text-white"
						/>
						<button
							type="submit"
							class="rounded-full bg-gradient-to-r from-sky-400 to-sky-300 p-4 dark:text-black"
							><svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="lucide lucide-send-horizontal"
								><path
									d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z"
								/><path d="M6 12h16" /></svg
							></button
						>
					</form>
				{:else}
					<div class=" flex gap-2">
						<input
							type="text"
							bind:value={projectName}
							on:submit={handleCreateEditor}
							placeholder="Project Name"
							name="project_name"
							class="w-full rounded-3xl border-none bg-white px-4 py-3 text-lg text-black placeholder-black placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-sky-300 dark:bg-primary dark:text-white"
						/>
						<button
							on:click={handleCreateEditor}
							class="rounded-full bg-gradient-to-r from-sky-400 to-sky-300 p-4 dark:text-black"
							><svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="lucide lucide-send-horizontal"
								><path
									d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z"
								/><path d="M6 12h16" /></svg
							></button
						>
					</div>
				{/if}
			</div>
		</div>
	</div>
</NavWrapper>
