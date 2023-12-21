<script>
	// import { saved_spinner, saveData } from '$lib/feEditor/store.js';
	import { current_data } from '$lib/index.js';
	import { faCodeFork, faSave, faSpinner } from '@fortawesome/free-solid-svg-icons';
	import { page } from '$app/stores';
	import Fa from 'svelte-fa';
	import { goto, invalidateAll } from '$app/navigation';
	import { handleRedirectURL } from '$lib/utils';
	import { jsPlugins, cssPlugins, sassActive } from '$lib/feEditor/store.js';
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
				tags: [],
				cssProcessor: $sassActive
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
	<div class="text-primary bg-green-500 rounded-md">
		<button
			on:click={forkData}
			aria-busy={busy}
			class="px-3 py-2 cursor-pointer flex gap-2 items-center justify-center active:scale-75 transition-transform duration-300"
		>
			<Fa icon={faSave} />
			<span class="hidden md:flex">Save</span>

			{#if busy}
				<span class="animate-spin"><Fa icon={faSpinner} /></span>
			{/if}
		</button>
	</div>
{:else}
	<button
		on:click={forkData}
		class:hidden={demo}
		aria-busy={busy}
		class="p-1 rounded-md cursor-pointer flex gap-2 items-center justify-center text-primary bg-green-500 px-3 py-2 active:scale-75 transition-transform duration-300"
	>
		<Fa icon={faCodeFork} />
		<span class="hidden md:flex">Fork</span>
		{#if busy}
			<span class="animate-spin"><Fa icon={faSpinner} /></span>
		{/if}
	</button>
{/if}
