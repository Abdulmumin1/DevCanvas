<script>
	import ShareBtn from '$components/ui/ShareBtn.svelte';
	import FeSave from './feSave.svelte';
	import { showSave } from '$lib/stores/playground.js';
	import { isOwner } from '$lib/stores/index.js';

	import FeFork from './feFork.svelte';
	import FePlaygroundTitle from './fePlaygroundTitle.svelte';
	import Login from '$components/auth/login.svelte';
	import SelectLayout from './selectLayout.svelte';
	import MobileNav from '$components/ui/mobileNav.svelte';
	import AiButton from './editorSets/aiButton.svelte';
	let { ispublic } = $props();
</script>

<nav class="flex h-10 w-full items-center border-b border-primary bg-black px-2 py-8 text-white">
	<ul class="flex w-full items-center justify-between">
		<li class="w-full">
			<div class="flex w-full flex-col">
				<div class="flex items-center gap-2">
					<a href="/play" class="">
						<img src="/logo.svg" class="h-10 w-10" alt="snippetsLand" />
					</a>

					<FePlaygroundTitle />
				</div>
			</div>
		</li>
		<ul class="flex items-center justify-center gap-2">
			<!-- <li><ReloadEditor /></li> -->
			<AiButton />
			<li class="hidden md:flex"><SelectLayout /></li>
			{#if $isOwner}
				{#if $showSave}
					<li class=""><FeSave /></li>
				{/if}
			{:else if ispublic}
				<li class="hidden md:flex"><FeFork /></li>
			{/if}

			<!-- <li class="hidden md:flex"><FeGetEmbed /></li> -->
			<li><ShareBtn /></li>
			<li
				class="flex items-center justify-center rounded bg-gray-300 px-2 py-2 text-black dark:bg-secondary-dark dark:text-white md:hidden"
			>
				<MobileNav />
			</li>
			<li class="hidden text-black md:block">
				<Login />
			</li>
		</ul>
	</ul>
</nav>
