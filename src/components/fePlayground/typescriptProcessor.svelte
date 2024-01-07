<script>
	import SingleSetting from './singleSetting.svelte';
	import { saveConfig, canvasConfig, typescriptActive, babelActive } from '$lib/feEditor/store.js';
	import { current_data } from '$lib/index.js';

	let selectMore;
	let delay = 1000;

	function change(event) {
		babelActive.set(false);
		let active = event.detail.status;
		typescriptActive.set(active);
		clearTimeout(selectMore);

		selectMore = setTimeout(() => {
			try {
				saveConfig({ ...$canvasConfig, typescriptActive: active }, $current_data.id);
			} catch (err) {
				console.error(err);
			}
		}, delay);
	}
</script>

<div class="">
	<SingleSetting label={'Babel - Typescript'} checked={$typescriptActive} on:checked={change} />
</div>
