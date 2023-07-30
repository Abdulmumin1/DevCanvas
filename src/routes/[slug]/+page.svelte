<script>
	import LanguageSelect from '../../components/languageSelect..svelte';
	import Nav from '../../components/nav.svelte';
	import CodeText from '../../components/codeText.svelte';
	import { current_data } from '$lib/index.js';
	import { onMount } from 'svelte';

	export let data;

	function handleContentChange(event) {
		current_data.update((cur) => {
			return { ...cur, code: event.detail };
		});
		console.log($current_data);
		console.log(event.detail);
	}

	// Subscribe to the content store to update the input when necessary

	onMount(() => {
		current_data.set(data);
	});
</script>

<article class="h-screen flex flex-col gap-4">
	<Nav />
	<div class="flex h-full gap-5 flex-col lg:flex-row p-4">
		<div class="w-full h-fit md:h-full bg-red-500 rounded-xl p-3">
			<!-- <pre>{data}</pre> -->
			<CodeText inputContent={data.code} on:contentChange={handleContentChange} />
		</div>
		<LanguageSelect />
	</div>
</article>
