<script>
	import { faSearch } from '@fortawesome/free-solid-svg-icons';

	import Fa from 'svelte-fa';
	import { page } from '$app/stores';
	import { faSearchengin } from '@fortawesome/free-brands-svg-icons';

	let query = $page.url.searchParams.get('query');
	let path = $page.url.pathname.endsWith('/dashboard') ? '/dashboard/search/?/search' : '?/search';
	let sort = 'tags';
</script>

<form action={path} class="relative flex" method="post">
	<input
		type="text"
		class="flex w-full items-center gap-2 rounded-lg bg-inherit px-3 py-2 outline-none transition-transform duration-300 focus:outline-2 focus:outline-sky-300 dark:text-white"
		placeholder="Search anything .."
		name="query"
		value={query}
	/>
	<span class="absolute right-0 top-[50%] mr-2 translate-y-[-50%] dark:text-white">
		<Fa icon={faSearch} />
	</span>
</form>
