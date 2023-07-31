<script>
	import LanguageSelect from '../../components/languageSelect..svelte';
	import Nav from '../../components/nav.svelte';
	import CodeText from '../../components/codeText.svelte';
	import { current_data,   previewMode } from '$lib/index.js';
	import {supabase} from '$lib/supabase.js'
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


	const setPreview = (user) => {
		console.log(user.id, data['0'].user_id)
		
		if (user.id == data['0'].user_id){
			previewMode.set(false)
		}else{
			previewMode.set(true)
		}
	}

	// console.log(user)
	onMount(() => {
		current_data.set(data['0']);
		console.log(data);
		// getUser()
	});
</script>

<article class="min-h-screen flex flex-col gap-4">
	{#if data.isFound}
		<Nav />

		<div class="flex h-full gap-5 flex-col lg:flex-row p-4">
			<div class="w-full  min-h-[400px] md:h-full max-h-[500px] md:max-h-[900px] bg-gray-50 rounded-xl p-3">
				<CodeText inputContent={data['0'].code} on:contentChange={handleContentChange} />
			</div>
			<LanguageSelect lang={data['0'].lang} />
		</div>
	{:else}
		<div class="font-bold">
			<h1 class="text-xl">404</h1>
			<p>Not found</p>
			{data.isFound}
		</div>
	{/if}
</article>
