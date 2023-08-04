<script>
	import { onMount, afterUpdate } from 'svelte';
	import 'prismjs/themes/prism-tomorrow.css';
	import Prism from 'prismjs';

	export let code;
	export let language = 'javascript';

	async function loadLanguage(language) {
		if (!Prism.languages[language]) {
			await import(`prismjs/components/prism-${language}`);
		}
	}

	onMount(async () => {
		await loadLanguage(language);
		Prism.highlightAll();
	});

	afterUpdate(async () => {
		await loadLanguage(language);
		Prism.highlightAll();
	});
</script>

<pre>
    <code class="language-{language}  h-full overflow-scroll bg-stone-800 textSmall">{code}</code>
  </pre>

<style>
	.textSmall {
		font-size: 14px !important;
		overflow-x: scroll !important;
	}
</style>
