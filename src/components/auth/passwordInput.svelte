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
	class="flex border border-sky-200 w-full rounded outline-none focus-within:outline focus-within:outline-sky-300 focu"
>
	<input
		{name}
		type="password"
		{id}
		bind:value={password}
		bind:this={el}
		required
		class=" p-1 w-full outline-none"
	/>
	<button on:click={toggle} class="w-fit p-1">
		<Fa {icon} />
	</button>
</div>
