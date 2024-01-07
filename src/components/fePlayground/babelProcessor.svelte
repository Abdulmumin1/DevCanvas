<script>
	import SingleSetting from './singleSetting.svelte';
	import { saveConfig, canvasConfig, babelActive, typescriptActive } from '$lib/feEditor/store.js';
	import { current_data } from '$lib/index.js';

	let selectMore;
	let delay = 1000;

	function change(event) {
		typescriptActive.set(false);
		let active = event.detail.status;
		babelActive.set(active);
		clearTimeout(selectMore);

		selectMore = setTimeout(() => {
			try {
				saveConfig({ ...$canvasConfig, babelActive: active }, $current_data.id);
			} catch (err) {
				console.error(err);
			}
		}, delay);
	}
</script>

<div class="">
	<SingleSetting label={'Babel'} checked={$babelActive} on:checked={change} />
</div>
