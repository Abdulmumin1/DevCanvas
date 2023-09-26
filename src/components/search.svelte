<script>
	import { faSearch } from '@fortawesome/free-solid-svg-icons';

	import Fa from 'svelte-fa';
	import { page } from '$app/stores';

	let query = $page.url.searchParams.get('query');
</script>

<div
	class="group w-full dark:text-white bg-sky-50 dark:bg-secondary-dark rounded-3xl flex items-center px-3 py-2 transition-transform duration-300 gap-2"
>
	<Fa icon={faSearch} />
	<form action="?/search" class="w-full" method="post">
		<input
			type="text"
			class="outline-none bg-inherit w-full"
			placeholder="Search for Tags, Langauges .."
			name="query"
			value={query}
		/>
	</form>
</div>
