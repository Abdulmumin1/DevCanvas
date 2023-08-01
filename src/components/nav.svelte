<script>
	import Msdropdown from './msdropdown.svelte';
	import Save from './save.svelte';
	import { previewMode, user, current_data } from '$lib/index.js';
	import Fa from 'svelte-fa';
	import { faArrowUpFromBracket, faPenToSquare, faPencil } from '@fortawesome/free-solid-svg-icons';

	$: editIcon = faPenToSquare;
	const removePreview = () => {
		if ($user.id == $current_data.user_id) {
			console.log('jfdkjafdlka');
			previewMode.update((cur) => !cur);
		}
	};
</script>

<nav class=" w-full">
	<ul class="w-full flex justify-between items-center p-4 shadow">
		<li class="text-2xl text-sky-400 font-bold">Snippets</li>
		<ul class="flex gap-3 items-center justify-center">
			<li class="bg-sky-300 px-3 shadow-sm py-2 rounded-lg cursor-pointer">
				<button class="w-full h-full flex items-center justify-center gap-2"
					><Fa icon={faArrowUpFromBracket} />Share</button
				>
			</li>
			<li>
				{#if !$previewMode}
					<Save />
				{/if}
			</li>
			<li>
				<button on:click={removePreview} class="flex items-center justify-center text-lg">
					<Fa icon={editIcon} class="transition-transform duration-150 hover:scale-110" /></button
				>
			</li>
			<li>
				<Msdropdown />
			</li>
		</ul>
	</ul>
</nav>
