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
		class="fixed z-50 bottom-0  left-0 w-full bg-secondary-dark border-t-8 pt-8 pb-4 border-sky-400 shadow-sm text-white p-4 flex flex-col gap-5 h-48 justify-center"
	>
	<div class="text-xl"><span class="font-bold">Hey 👋🏽</span>, Looks like you're new here!</div>
		<p class="">DevCanvas uses cookies to ensure the best experience - Read our <a href="/terms-of-service" class="text-sky-500">terms of service</a></p>
		<button
			class="bg-sky-400 hover:bg-sky-300 font-bold py-2 px-4 rounded text-black w-fit"
			on:click={acceptCookies}>Accept</button
		>
	</div>
{/if}
