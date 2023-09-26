<script>
	import { faSpinner } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { page } from '$app/stores';

	import { onMount } from 'svelte';
	import { redirect } from '@sveltejs/kit';
	import { goto } from '$app/navigation';
	let whereTo = $page.url.searchParams.get('whereto');
	if (!['/dashboard', '/profile'].includes(whereTo)) {
		whereTo = '/';
	}
	onMount(() => {
		setTimeout(() => {
			goto(whereTo);
		}, 500);
	});
</script>

<div class="h-screen flex items-center justify-center text-2xl md:text-5xl gap-4">
	Preparing for redirect <span class="animate-spin"><Fa icon={faSpinner} /></span>
</div>
