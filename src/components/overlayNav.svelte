<script>
	import MobileNav from './mobileNav.svelte';
</script>

<ul
	class="flex justify-between items-center md:hidden dark:text-white bg-gray-200 p-3 rounded-md dark:bg-secondary-dark"
>
	<li class="flex items-center justify-center">
		<!-- <button on:click={toggleKbar} class="text-xl"><Fa icon={faBars} /></button> -->
		<MobileNav />
	</li>
</ul>
