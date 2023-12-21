<script>
	import SingleSetting from './singleSetting.svelte';
	import { sassActive, saveConfig, canvasConfig } from '$lib/feEditor/store.js';
	import { current_data } from '$lib/index.js';

	let selectMore;
	let delay = 1000;

	function change(event) {
		let active = event.detail.status;
		sassActive.set(active);
		console.log($canvasConfig);
		clearTimeout(selectMore);

		selectMore = setTimeout(() => {
			try {
				saveConfig({ ...$canvasConfig, cssProcessor: active }, $current_data.id);
			} catch (err) {
				console.error(err);
			}
		}, delay);
	}
</script>

<div class="">
	<SingleSetting label={'CSS Processor (SCSS)'} checked={$sassActive} on:checked={change} />
</div>
