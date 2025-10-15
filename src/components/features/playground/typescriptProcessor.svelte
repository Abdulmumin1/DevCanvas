<script>
	import SingleSetting from './singleSetting.svelte';
	import {
		saveConfig,
		canvasConfig,
		typescriptActive,
		babelActive
	} from '$lib/stores/playground.js';
	import { current_data } from '$lib/stores/index.js';

	let selectMore;
	let delay = 1000;

	function change(event) {
		babelActive.set(false);
		let active = event.detail.status;
		typescriptActive.set(active);
		clearTimeout(selectMore);

		canvasConfig.update((cur) => {
			return { ...cur, typescriptActive: active };
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

<div class="">
	<SingleSetting label={'Babel - Typescript'} checked={$typescriptActive} on:checked={change} />
</div>
