<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	let showBanner;

	const acceptCookies = () => {
		localStorage.setItem('cookieConsent', 'true');
		showBanner = false;
	};

	onMount(() => {
		setTimeout(() => {
			showBanner = localStorage.getItem('cookieConsent') !== 'true';
		}, 5000);
	});
</script>

{#if showBanner}
	<div
		transition:fly={{ y: 200 }}
		class="fixed z-50 bottom-0 left-0 w-full bg-secondary-dark rounded-xl shadow-sm text-white p-4 md:w-[500px] md:m-4 flex flex-col gap-5 h-40 justify-center"
	>
		<p class="text-lg">DevCanvas uses cookies to ensure the best experience</p>
		<button
			class="bg-sky-400 hover:bg-sky-300 font-bold py-2 px-4 rounded text-black w-fit"
			on:click={acceptCookies}>Accept</button
		>
	</div>
{/if}
