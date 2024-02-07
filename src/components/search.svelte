<script>
	import { faSearch } from '@fortawesome/free-solid-svg-icons';

	import Fa from 'svelte-fa';
	import { page } from '$app/stores';
	import { faSearchengin } from '@fortawesome/free-brands-svg-icons';

	let query = $page.url.searchParams.get('query');
	let path = $page.url.pathname.endsWith('/dashboard') ? '/dashboard/search/?/search' : '?/search';
	let sort = 'tags';
</script>

<div
	class="group w-full dark:text-white bg-gray-100 dark:bg-secondary-dark rounded-xl flex items-center px-3 py-2 transition-transform duration-300 gap-2"
>
	<Fa icon={faSearch} />
	<form action={path} class="w-full" method="post">
		<input
			type="text"
			class="outline-none bg-inherit w-full"
			placeholder="Search anything .."
			name="query"
			value={query}
		/>
	</form>

	<!-- <div>
		<span>Search by</span>
		<button><Fa icon={faSearch} /></button>
	</div> -->
</div>
