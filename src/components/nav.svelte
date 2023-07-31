<script>
	import Msdropdown from './msdropdown.svelte';
	import Save from './save.svelte';
	import {previewMode, user, current_data} from '$lib/index.js'
	import Fa from 'svelte-fa';
	import { faPencil } from '@fortawesome/free-solid-svg-icons';

	$: editIcon = faPencil
	const removePreview = ()=>{
		if ($user.id == $current_data.user_id){
			console.log("jfdkjafdlka")
			previewMode.update((cur)=>!cur)
		}
	}
</script>

<nav class=" w-full">
	<ul class="w-full flex justify-between items-center p-4 shadow">
		<li class="text-2xl">Snippets</li>
		<ul class="flex gap-3 items-center justify-center">
			<li class="bg-sky-300 px-3 shadow-sm py-2 rounded-lg cursor-pointer"><button class="w-full h-full">Share</button></li>
			<li>
				{#if !$previewMode}
	
					<Save />
				{/if}
			</li>
			<li>
				<button on:click={removePreview}> <Fa icon={editIcon}/></button>
			</li>
			<li>
				<Msdropdown />
			</li>
		</ul>
	</ul>
</nav>
