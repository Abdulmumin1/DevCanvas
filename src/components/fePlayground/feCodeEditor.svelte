<script>
	import { Splitpanes, Pane } from 'svelte-splitpanes';
	import FeCss from './feCSS.svelte';
	import FeHtml from './feHTML.svelte';
	export let initialHTML;
	export let initialCSS;
</script>

<Splitpanes horizontal theme="my-theme">
	<Pane snapSize={20}>
		<p class="bg-gray-50 dark:bg-black px-3">HTML</p>
		<FeHtml {initialHTML} />
	</Pane>
	<Pane snapSize={10}>
		<p class="bg-gray-50 dark:bg-black px-3">CSS</p>
		<FeCss {initialCSS} />
	</Pane>
</Splitpanes>
