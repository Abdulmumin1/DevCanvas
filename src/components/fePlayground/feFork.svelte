<script>
	// import { saved_spinner, saveData } from '$lib/feEditor/store.js';
	import { current_data, user } from '$lib/index.js';
	import { faCodeFork, faSave, faSpinner } from '@fortawesome/free-solid-svg-icons';
	import { page } from '$app/stores';
	import Fa from 'svelte-fa';
	import { goto, invalidateAll } from '$app/navigation';
	import { handleRedirectURL } from '$lib/utils';

	import { jsPlugins, cssPlugins, canvasConfig } from '$lib/feEditor/store.js';
	import Login from '../auth/login.svelte';
	let busy = false;

	let demo = $page.url.pathname.endsWith('/try');

	async function forkData() {
		busy = true;
		let formData = new FormData();

		formData.append('js', $current_data.js);
		formData.append('css', $current_data.css);
		formData.append('html', $current_data.html);
		formData.append('description', $current_data.description);
		formData.append(
			'plugins',
			JSON.stringify({
				css: $cssPlugins,
				js: $jsPlugins
			})
		);

		formData.append(
			'config',
			JSON.stringify({
				...$canvasConfig,
				tags: []
			})
		);

		formData.append('url', $page.url.pathname);

		const response = await fetch('/db/fe/fork', {
			method: 'POST',
			body: formData
		});

		// console.log('response', response.json());
		if (response.ok) {
			let d = await response.json();
			// invalidateAll();
			if (demo) {
				goto(d.url);
			} else {
				window.location.href = d.url;
			}
			// window.l
		} else {
			if (response.status == 400) {
				goto(handleRedirectURL($page.url));
			}
		}
	}
</script>

{#if demo}
	<div class="rounded-md bg-green-500 text-primary">
		{#if $user}
			<button
				on:click={forkData}
				aria-busy={busy}
				title="Save"
				class="flex cursor-pointer items-center justify-center gap-2 px-3 py-2 transition-transform duration-300 active:scale-75"
			>
				<Fa icon={faSave} />
				<span class="hidden md:flex">Save</span>

				{#if busy}
					<span class="animate-spin"><Fa icon={faSpinner} /></span>
				{/if}
			</button>
		{:else}
			<div class="">
				<Login disquise={true} />
			</div>
		{/if}
	</div>
{:else}
	<button
		on:click={forkData}
		class:hidden={demo}
		aria-busy={busy}
		title="Fork"
		class="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-green-500 p-1 px-3 py-2 text-primary transition-transform duration-300 active:scale-75"
	>
		<Fa icon={faCodeFork} />
		<span class="hidden md:flex">Fork</span>
		{#if busy}
			<span class="animate-spin"><Fa icon={faSpinner} /></span>
		{/if}
	</button>
{/if}
