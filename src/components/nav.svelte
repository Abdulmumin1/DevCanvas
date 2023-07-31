<script>
	import Msdropdown from './msdropdown.svelte';
	import Save from './save.svelte';
	// Function to update the store value
</script>

<nav class=" w-full">
	<ul class="w-full flex justify-between items-center p-4 shadow">
		<li class="text-2xl">Snippets</li>
		<ul class="flex gap-3 items-center justify-center">
			<li class="bg-sky-300 px-3 shadow-sm py-2 rounded-lg cursor-pointer">Share</li>
			<li>
				<Save />
			</li>
			<li>
				<Msdropdown />
			</li>
		</ul>
	</ul>
</nav>
