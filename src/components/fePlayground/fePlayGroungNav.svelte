<script>
	import ShareBtn from '../ShareBtn.svelte';
	import Darkmode from '../darkmode.svelte';
	import FeSave from './feSave.svelte';
	import { showSave, showLoginToSave } from '$lib/feEditor/store.js';
	import { user, isOwner } from '$lib/index.js';
	import logo from '$lib/logo.png';

	import FeFork from './feFork.svelte';
	import FePlaygroundTitle from './fePlaygroundTitle.svelte';
	import FeGetEmbed from './feGetEmbed.svelte';
	import Login from '../auth/login.svelte';
</script>

<nav class="w-full bg-black h-10 px-2 py-8 flex items-center text-white border-b border-primary">
	<ul class="w-full flex items-center justify-between">
		<li class="w-full">
			<div class="flex flex-col w-full">
				<div class="flex items-center gap-2">
					<a href="/play">
						<img src={logo} class="h-6 w-6" alt="snippetsLand" />
					</a>

					<FePlaygroundTitle />
				</div>
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
			<li><Darkmode /></li>
			<li>
				<Login />
			</li>
		</ul>
	</ul>
</nav>
