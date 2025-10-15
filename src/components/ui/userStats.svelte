<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { derived } from 'svelte/store';
	import { quintOut } from 'svelte/easing';

	let { supabase, user_id } = $props();
	async function statsCanvas(pageNumber, pageSize) {
		const { data, error } = await supabase
			.from('htmlPlayground')
			.select('id')
			.eq('user_id', user_id);
		if (error) {
			console.error('Error fetching data:', error.message);
			return;
		}
		return data;
	}

	async function statsSnippets(pageNumber, pageSize) {
		const { data, error } = await supabase.from('snips').select('id').eq('user_id', user_id);
		if (error) {
			console.error('Error fetching data:', error.message);
			return;
		}
		return data;
	}

	let myNumber = tweened(0, { duration: 2000, easing: quintOut });
	let formatted = derived(myNumber, ($myNumber) => $myNumber.toFixed());

	let statSnip = tweened(0, { duration: 2000, easing: quintOut });
	let snipCount = derived(statSnip, ($statSnip) => $statSnip.toFixed());

	onMount(async () => {
		let cont = await statsCanvas();

		myNumber.set(cont?.length);

		let co = await statsSnippets();
		statSnip.set(co?.length);
	});
</script>

<div class=" flex w-full max-w-[400px] gap-4">
	<div
		class="flex h-[150px] w-full flex-col items-center justify-center rounded-xl bg-sky-light text-center dark:bg-secondary-dark"
	>
		<div class="text-2xl">canvas</div>
		<div class="text-6xl">{$formatted}</div>
		<a href="/play/try">+ New</a>
	</div>

	<div
		class="flex h-[150px] w-full flex-col items-center justify-center rounded-xl bg-sky-light text-center dark:bg-secondary-dark"
	>
		<div class="text-2xl">Snippets</div>
		<div class="text-6xl">{$snipCount}</div>
	</div>
</div>
