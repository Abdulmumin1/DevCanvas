<script>
	import SingleSetting from './singleSetting.svelte';
	import { sassActive, saveConfig, canvasConfig } from '$lib/stores/playground.js';
	import { current_data } from '$lib/stores/index.js';

	let selectMore;
	let delay = 1000;

	function change(event) {
		let active = event.detail.status;
		sassActive.set(active);
		// console.log($canvasConfig);
		clearTimeout(selectMore);

		canvasConfig.update((cur) => {
			return { ...cur, cssProcessor: active };
		});

		selectMore = setTimeout(() => {
			try {
				saveConfig({ ...$canvasConfig }, $current_data.id);
			} catch (err) {
				console.error(err);
			}
		}, delay);
	}
</script>

<div class="rounded-lg bg-gray-200 p-2 dark:bg-primary">
	<SingleSetting label={'CSS Processor (SCSS)'} checked={$sassActive} on:checked={change} />
</div>
