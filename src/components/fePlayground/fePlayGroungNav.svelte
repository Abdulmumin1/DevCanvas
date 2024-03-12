<script>
	import ShareBtn from '../ShareBtn.svelte';
	import Darkmode from '../darkmode.svelte';
	import FeSave from './feSave.svelte';
	import { showSave, showLoginToSave } from '$lib/feEditor/store.js';
	import { user, isOwner } from '$lib/index.js';

	import FeFork from './feFork.svelte';
	import FePlaygroundTitle from './fePlaygroundTitle.svelte';
	import FeGetEmbed from './feGetEmbed.svelte';
	import Login from '../auth/login.svelte';
	import SelectLayout from './selectLayout.svelte';
	import MobileNav from '../mobileNav.svelte';
	export let ispublic;
</script>

<nav class="w-full bg-black h-10 px-2 py-8 flex items-center text-white border-b border-primary">
	<ul class="w-full flex items-center justify-between">
		<li class="w-full">
			<div class="flex flex-col w-full">
				<div class="flex items-center gap-2">
					<a href="/play" class="">
						<img src="/logo.svg" class="h-10 w-10" alt="snippetsLand" />
					</a>

					<FePlaygroundTitle />
				</div>
			</div>
		</li>
		<ul class="flex items-center justify-center gap-2">
			<li class="hidden md:flex"><SelectLayout /></li>
			{#if $isOwner}
				{#if $showSave}
					<li class=""><FeSave /></li>
				{/if}
			{:else if ispublic}
				<li class="hidden md:flex"><FeFork /></li>
			{/if}
			<li class="hidden md:flex"><FeGetEmbed /></li>
			<li><ShareBtn /></li>
			<li class="hidden md:block"><Darkmode /></li>
			<li
				class="md:hidden bg-gray-300 text-black px-2 py-2 dark:bg-secondary-dark dark:text-white rounded flex items-center justify-center"
			>
				<MobileNav />
			</li>
			<li class="text-black hidden md:block">
				<Login />
			</li>
		</ul>
	</ul>
</nav>
