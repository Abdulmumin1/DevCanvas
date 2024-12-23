<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import NavWrapper from '$components/snips/navWrapper.svelte';
	import { user } from '$lib/index.js';

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

<NavWrapper>
	<div class="mx-[-30px] min-h-[10vh] overflow-hidden bg-gradient-to-br p-8 pt-20 dark:bg-primary">
		<div
			class="mx-auto flex max-w-4xl flex-col rounded-[50px] bg-gray-100 p-6 dark:bg-secondary-dark md:p-20"
		>
			<div class="flex items-center gap-2 text-2xl md:text-4xl">
				<span
					class="flex aspect-square h-10 items-center justify-center rounded-full bg-sky-300 text-3xl dark:text-black md:h-16 md:text-5xl"
					>+</span
				> <span class="dark:text-white">Create new Canvas</span>
			</div>
			{#if $user}
				<form method="post" action="/db/fe/create" class="mt-20 flex gap-2">
					<input
						type="text"
						bind:value={projectName}
						placeholder="Project Name"
						name="project_name"
						class="w-full rounded-3xl border-none bg-white px-4 py-3 text-lg text-black placeholder-black placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-sky-300 dark:bg-primary dark:text-white"
					/>
					<button type="submit" class="rounded-full bg-sky-300 p-4 dark:text-black"
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
				<div class="mt-20 flex gap-2">
					<input
						type="text"
						bind:value={projectName}
						on:submit={handleCreateEditor}
						placeholder="Project Name"
						name="project_name"
						class="w-full rounded-3xl border-none bg-white px-4 py-3 text-lg text-black placeholder-black placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-sky-300 dark:bg-primary dark:text-white"
					/>
					<button on:click={handleCreateEditor} class="rounded-full bg-sky-300 p-4 dark:text-black"
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
</NavWrapper>
