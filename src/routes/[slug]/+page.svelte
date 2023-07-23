<script>
	import LanguageSelect from '../../components/languageSelect..svelte';
	import Nav from '../../components/nav.svelte';
	import { current_key } from '$lib/index.js';
	import CodeText from '../../components/codeText.svelte';
	import { onMount } from 'svelte';
	export let data;

	$: code = data.code;
	$: key = $current_key.key;
	$: lang = $current_key.lang;

	function handleContentChange(event) {
		current_key.set({
			key: key,
			lang: lang,
			code: event.detail
		});
		// console.log(event.detail);
	}

	// Subscribe to the content store to update the input when necessary
	let currentContent = '';
	current_key.subscribe((content) => {
		currentContent = content;
	});

	// onMount(()=>{
	//     current_key.set({
	// 		key: undefined,
	// 		lang: undefined,
	// 		code:
	// 	});
	// })
</script>

<article class="h-screen flex flex-col gap-4">
	<Nav />
	<div class="flex h-full gap-5 flex-col lg:flex-row p-4">
		<form method="post" class="w-full h-fit md:h-full bg-red-500 rounded-xl p-3">
			<CodeText inputContent={code} on:contentChange={handleContentChange} />
		</form>
		<LanguageSelect />
	</div>
</article>
