<script>
	import { supabase } from '$lib/supabase.js';
	import { generateRandomKey } from '$lib/index.js';

	$: content = 'null';
	const create_new = async () => {
		let code = '// your code here';
		let lang = 'javascript';
		let key = generateRandomKey();
		const { data, error } = await supabase
			.from('snips')
			.insert([{ code: code, lang: lang, project_key: key }]);

		if (error) {
			console.error(error);
		} else {
			console.log(data);
		}
	};
</script>

<div class="flex items-center justify-center h-screen flex-col gap-2">
	<h1 class="text-6xl">Snippets</h1>
	<button class="bg-sky-300 px-5 py-2 rounded-lg shadow-lg" on:click={create_new}>new</button>

	<p>
		{content}
	</p>
</div>
