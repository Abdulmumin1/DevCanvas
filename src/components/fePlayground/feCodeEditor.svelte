<script>
	import { Splitpanes, Pane } from 'svelte-splitpanes';
	import FeCss from './feCSS.svelte';
	import FeHtml from './feHTML.svelte';
	export let initialHTML;
	export let initialCSS;
</script>

<Splitpanes horizontal theme="my-theme">
	<Pane snapSize={20}>
		<p class="bg-white dark:bg-primary">HTML</p>
		<FeHtml {initialHTML} />
	</Pane>
	<Pane snapSize={10}>
		<p class="bg-white dark:bg-primary">CSS</p>
		<FeCss {initialCSS} />
	</Pane>
</Splitpanes>
