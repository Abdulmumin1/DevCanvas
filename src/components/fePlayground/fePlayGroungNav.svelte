<script>
	import ShareBtn from '../ShareBtn.svelte';
	import Darkmode from '../darkmode.svelte';
	import FeSave from './feSave.svelte';
	import { showSave, showLoginToSave } from '$lib/feEditor/store.js';
	import { user, isOwner } from '$lib/index.js';
	import { handleRedirectURL } from '$lib/utils.js';
	import { faExclamationTriangle, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
	import { page } from '$app/stores';
	import Fa from 'svelte-fa';
	import FeFork from './feFork.svelte';
	import FePlaygroundTitle from './fePlaygroundTitle.svelte';
	export let title;

	let signinURL = handleRedirectURL($page.url);
</script>

<nav
	class="w-full bg-white dark:bg-secondary-dark dark:shadow-black dark:shadow-lg h-10 px-4 py-10 flex items-center text-light border-b dark:border-primary"
>
	<ul class="w-full flex items-center justify-between">
		<li class="w-full">
			<div class="flex flex-col leading-none w-full">
				<FePlaygroundTitle {title} />
				<p
					class="text-sky-400 dark:text-sky-300 outline-none focus:outline-sky-300 p-1 focus:dark:outline-sky-400 rounded-lg"
					spellcheck="false"
				>
					by Abdulmumin Yaqeen
				</p>
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
		<ul class="flex gap-2 items-center justify-center">
			{#if $isOwner}
				{#if $showSave}
					<li><FeSave /></li>
				{/if}
			{:else}
				<li><FeFork /></li>
			{/if}
			<li class="text-primary"><ShareBtn /></li>
			<li class=" bg-primary rounded-lg"><Darkmode /></li>
			{#if !$user}
				<li class="bg-primary px-3 py-3 md:py-2 rounded-lg">
					<a href={signinURL}>
						<span class="flex md:hidden"><Fa icon={faRightToBracket} /></span>
						<span class="hidden md:flex">Login</span>
					</a>
				</li>
			{/if}
		</ul>
	</ul>
</nav>
