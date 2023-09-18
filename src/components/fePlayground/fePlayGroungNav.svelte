<script>
	import ShareBtn from '../ShareBtn.svelte';
	import Darkmode from '../darkmode.svelte';
	import FeSave from './feSave.svelte';
	import { showSave, showLoginToSave } from '$lib/feEditor/store.js';
	import { user, isOwner } from '$lib/index.js';
	import logo from '$lib/logo.png';

	import { handleRedirectURL } from '$lib/utils.js';
	import { faExclamationTriangle, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
	import { page } from '$app/stores';
	import Fa from 'svelte-fa';
	import FeFork from './feFork.svelte';
	import FePlaygroundTitle from './fePlaygroundTitle.svelte';
	import ProfileCard from '../profileCard.svelte';
	import FeGetEmbed from './feGetEmbed.svelte';

	let signinURL = handleRedirectURL($page.url);
</script>

<nav
	class="w-full bg-secondary-dark h-10 px-2 py-8 flex items-center text-white border-b border-primary"
>
	<ul class="w-full flex items-center justify-between">
		<li class="w-full">
			<div class="flex flex-col w-full">
				<div class="flex items-center gap-2">
					<a href="/html-playground">
						<img src={logo} class="h-6 w-6" alt="snippetsLand" />
					</a>

					<FePlaygroundTitle />
				</div>
				{#if $showLoginToSave}
					<div class="flex items-center justify-center gap-2">
						<span class="text-error"><Fa icon={faExclamationTriangle} /></span>
						<span class="text-primary dark:text-light"
							><a href={signinURL} class="underline text-sky-500 dark:text-sky-300"> Login</a> to save
							progress</span
						>
					</div>
				{/if}
			</div>
		</li>
		<ul class="flex items-center justify-center gap-2">
			{#if $isOwner}
				{#if $showSave}
					<li><FeSave /></li>
				{/if}
			{:else}
				<li><FeFork /></li>
			{/if}
			<li><FeGetEmbed /></li>
			<li><ShareBtn /></li>
			<li class=""><Darkmode /></li>
			{#if !$user}
				<li class="bg-primary px-3 py-3 md:py-2 rounded-lg">
					<a href={signinURL}>
						<span class="flex md:hidden"><Fa icon={faRightToBracket} /></span>
						<span class="hidden md:flex">Login</span>
					</a>
				</li>
			{:else}
				<li>
					<ProfileCard />
				</li>
			{/if}
		</ul>
	</ul>
</nav>
