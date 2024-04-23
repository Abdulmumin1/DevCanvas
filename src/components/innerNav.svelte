<script>
	import Fa from 'svelte-fa';
	import Darkmode from './darkmode.svelte';
	import { faWindowMaximize } from '@fortawesome/free-solid-svg-icons';
	import { page } from '$app/stores';
	import Open from './kbar/open.svelte';
	import MobileNav from './mobileNav.svelte';
</script>

<div
	class="top-0 flex items-center justify-center border-b border-primary bg-sky-300 py-3 dark:border-secondary-dark dark:bg-secondary-dark"
>
	<div class="h-[50px] w-full max-w-[1200px] bg-inherit px-2">
		<ul class="hidden w-full items-center justify-between md:flex">
			<li>
				<a
					href="/"
					class="group flex items-center justify-center gap-2 rounded-3xl bg-secondary-dark px-3 py-2 text-base text-light md:text-lg"
				>
					<img
						src="/logo.svg"
						class="h-8 w-8 transition-all duration-300 group-hover:rotate-45"
						alt="DevCanvas"
					/>
					<span>DevCanvas </span>
				</a>
			</li>
			<li>
				<ul class="flex items-center gap-2">
					<li class="rounded-full bg-secondary-dark px-3 py-2 text-light">
						<Open />
					</li>
					<li class="rounded-full bg-secondary-dark px-3 py-2 text-light">
						<a class="flex items-center justify-center gap-2" href="/play">
							Playground <Fa icon={faWindowMaximize} class="" /></a
						>
					</li>

					<li class="rounded-full bg-secondary-dark p-2" class:landing={$page.url.pathname == '/'}>
						<div class="flex items-center justify-center gap-2 text-light">
							<Darkmode />
						</div>
					</li>
				</ul>
			</li>
		</ul>

		<ul class="flex items-center justify-between md:hidden">
			<li
				class="flex items-center justify-center gap-3 rounded-3xl bg-secondary-dark px-3 py-2 text-base text-light md:text-lg"
			>
				<img src="/logo.svg" class="h-6 w-6" alt="snippetsLand" />
				<a href="/"> DevCanvas </a>
			</li>

			<li
				class="flex items-center justify-center gap-4 rounded-3xl bg-secondary-dark px-3 py-2 text-xl text-light"
			>
				<Darkmode />
				<!-- <button on:click={toogleOpen}><Fa icon={faBars} /></button> -->
				<MobileNav />
			</li>
		</ul>
	</div>
</div>

<style>
	.landing:first-child {
		color: aliceblue !important;
		/* font-size: 1000px; */
	}
</style>
