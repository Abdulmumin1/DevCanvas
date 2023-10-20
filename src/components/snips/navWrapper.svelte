<script>
	import { faBarChart, faBars, faEllipsis } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import SnipsSideNav from './snipsSideNav.svelte';
	import { user } from '$lib/index.js';
	import Darkmode from '../darkmode.svelte';
	import { page } from '$app/stores';
	import { handleRedirectURL } from '$lib/utils.js';
	import Search from '../search.svelte';
	import OverlayNav from '../overlayNav.svelte';
	import ProfileCard from '../profileCard.svelte';
	import { fly } from 'svelte/transition';

	let signinURL = handleRedirectURL($page.url);
</script>

<div class="flex min-h-screen h-screen w-full">
	<div class=" bg-inherit h-full">
		<SnipsSideNav />
	</div>

	<!-- second part -->

	<div class="flex flex-col h-full w-full">
		<!-- Upper nave -->
		<div class="w-full px-3 py-3 border-b text-primary dark:border-secondary-dark">
			<ul class="flex items-center justify-end w-full gap-2">
				<li><OverlayNav /></li>
				<li class="w-full"><Search /></li>
				<li class="text-black dark:text-white"><Darkmode /></li>

				{#if !$user}
					<li><a href={signinURL} class="bg-green-400 p-3 rounded-lg">Join</a></li>
				{:else}
					<li><ProfileCard /></li>
				{/if}
			</ul>
		</div>

		<div
			class="h-full w-full overflow-y-scroll px-4 md:px-6 mb-4"
			transition:fly={{ duration: 400 }}
		>
			<slot />
		</div>
	</div>
</div>
