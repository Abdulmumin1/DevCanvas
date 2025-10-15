<script>
	import { faEye, faEyeSlash, faGamepad } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { fly, scale } from 'svelte/transition';

	let el = $state();
	let show = $state(false);
	let icon = $derived(show ? faEyeSlash : faEye);
	/**
	 * @typedef {Object} Props
	 * @property {any} password
	 * @property {any} id
	 * @property {string} [name]
	 */

	/** @type {Props} */
	let { password = $bindable(), id, name = 'password' } = $props();

	function toggle() {
		show = !show;
		if (show) {
			el.setAttribute('type', 'text');
		} else {
			el.setAttribute('type', 'password');
		}
	}
</script>

<div
	class="focu flex w-full rounded-lg outline outline-2 outline-offset-0 outline-sky-200 focus-within:outline-4 focus-within:outline-sky-300"
>
	<input
		{name}
		type="password"
		{id}
		bind:value={password}
		bind:this={el}
		required
		class=" w-full px-3 py-2 outline-none"
	/>
	{#key icon}
		<button in:scale={{ start: -2 }} type="button" onclick={toggle} class="w-fit px-3 py-2">
			<Fa {icon} />
		</button>
	{/key}
</div>
