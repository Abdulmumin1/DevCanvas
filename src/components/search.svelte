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
	class="group flex w-full items-center gap-2 rounded-xl bg-gray-100 px-3 py-2 transition-transform duration-300 dark:bg-secondary-dark dark:text-white"
>
	<Fa icon={faSearch} />
	<form action={path} class="w-full" method="post">
		<input
			type="text"
			class="w-full bg-inherit outline-none"
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
