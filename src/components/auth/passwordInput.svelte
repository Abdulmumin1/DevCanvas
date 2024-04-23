<script>
	import { faEye, faEyeSlash, faGamepad } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	let el;
	let show = false;
	$: icon = show ? faEyeSlash : faEye;
	export let password;
	export let id;
	export let name = 'password';

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
	class="focu flex w-full rounded border border-sky-200 outline-none focus-within:outline focus-within:outline-sky-300"
>
	<input
		{name}
		type="password"
		{id}
		bind:value={password}
		bind:this={el}
		required
		class=" w-full p-1 outline-none"
	/>
	<button type="button" on:click={toggle} class="w-fit p-1">
		<Fa {icon} />
	</button>
</div>
