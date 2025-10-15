<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	let showBanner = $state();

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
		class="fixed bottom-0 left-0 z-50 flex h-48 w-full flex-col justify-center gap-5 border-t-8 border-sky-400 bg-secondary-dark p-4 pb-4 pt-8 text-white shadow-sm"
	>
		<div class="text-xl"><span class="font-bold">Hey 👋🏽</span>, Looks like you're new here!</div>
		<p class="">
			DevCanvas uses cookies to ensure the best experience - Read our <a
				href="/terms-of-service"
				class="text-sky-500">terms of service</a
			>
		</p>
		<button
			class="w-fit rounded bg-sky-400 px-4 py-2 font-bold text-black hover:bg-sky-300"
			onclick={acceptCookies}>Accept</button
		>
	</div>
{/if}
