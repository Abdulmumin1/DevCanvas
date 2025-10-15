<script>
	import SingleSetting from './singleSetting.svelte';
	import {
		saveConfig,
		canvasConfig,
		babelActive,
		typescriptActive
	} from '$lib/stores/playground.js';
	import { current_data } from '$lib/stores/index.js';

	let selectMore;
	let delay = 1000;

	function change(event) {
		typescriptActive.set(false);
		let active = event.detail.status;
		babelActive.set(active);
		clearTimeout(selectMore);

		canvasConfig.update((cur) => {
			return { ...cur, babelActive: active };
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
	<SingleSetting label={'Babel'} checked={$babelActive} on:checked={change} />
</div>
