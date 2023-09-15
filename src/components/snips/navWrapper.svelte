<script>
	import { faBarChart, faBars, faEllipsis } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import SnipsSideNav from './snipsSideNav.svelte';
	import { user } from '$lib/index.js';
	import Darkmode from '../darkmode.svelte';
</script>

<div class="flex min-h-screen h-screen w-full">
	<div class=" bg-inherit h-full">
		<SnipsSideNav />
	</div>

	<!-- second part -->

	<div class="flex flex-col h-full w-full">
		<!-- Upper nave -->
		<div class="w-full px-3 py-3 border-b text-primary dark:border-secondary-dark">
			<ul class="flex items-center justify-end w-full gap-2">
				<li><Darkmode /></li>
				{#if !$user}
					<li><a href="/jdjf" class="bg-green-400 p-3">Login</a></li>
					<li><a href="/jdjf" class="bg-sky-400 p-3">Signup</a></li>
				{/if}
			</ul>
		</div>

		<div class="h-full w-full overflow-y-scroll px-4 md:px-6"><slot /></div>
	</div>
</div>
