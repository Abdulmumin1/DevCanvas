<script>
	import { page } from '$app/stores';
	import Fa from 'svelte-fa';
	import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

	import { handleRedirectURL } from '$lib/utils.js';
	import { user } from '$lib/index.js';

	import ProfileCard from '../profileCard.svelte';

	let signinURL = handleRedirectURL($page.url);
</script>

{#if !$user}
	<li class="bg-green-500 px-2 py-2 md:py-2 rounded text-primary">
		<a href={signinURL}>
			<span class="flex md:hidden"><Fa icon={faRightToBracket} /></span>
			<span class="hidden md:flex">Join</span>
		</a>
	</li>
{:else}
	<li>
		<ProfileCard />
	</li>
{/if}
