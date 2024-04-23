<script>
	import { faSpinner } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { page } from '$app/stores';

	import { onMount } from 'svelte';
	import { redirect } from '@sveltejs/kit';
	import Loader from '$components/loader.svelte';
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

<div class="flex h-screen items-center justify-center gap-4 text-2xl md:text-5xl">
	Preparing for redirect <br />
	<Loader />
</div>
