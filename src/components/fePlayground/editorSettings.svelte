<script>
	import { editorSettingState } from '$lib/index.js';
	import Fa from 'svelte-fa';
	import { faSliders } from '@fortawesome/free-solid-svg-icons';
	import PluginsModal from '$components/fePlayground/pluginsModal.svelte';

	// let dropdownOpen = false;

	function toggleDropdown() {
		editorSettingState.update((cur) => {
			return !cur;
		});
	}

	// function closeDropdown() {
	// 	dropdownOpen = false;
	// }
</script>

<div class="dropdown relative flex gap-2 ">
	<PluginsModal/>
	<button
		class="dropdown-button flex items-center justify-end gap-2 transition-all duration-300 active:scale-95"
		on:click={toggleDropdown}
	>
		<Fa icon={faSliders} />
	</button>
</div>
