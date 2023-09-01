<script>
	import { faSearch } from '@fortawesome/free-solid-svg-icons';

	import Fa from 'svelte-fa';
</script>

<div
	class="group bg-sky-50 rounded-3xl flex items-center justify-center px-3 py-2 w-fit transition-transform duration-300 gap-2 hover:scale-105"
>
	<Fa icon={faSearch} />
	<input type="text" class="outline-none bg-inherit" placeholder="Search for Tags, Langauges .." />
</div>
