<script>
	import MobileNav from './mobileNav.svelte';
</script>

<ul
	class="flex items-center justify-between rounded-md bg-gray-200 p-3 dark:bg-secondary-dark dark:text-white md:hidden"
>
	<li class="flex items-center justify-center">
		<!-- <button on:click={toggleKbar} class="text-xl"><Fa icon={faBars} /></button> -->
		<MobileNav />
	</li>
</ul>
