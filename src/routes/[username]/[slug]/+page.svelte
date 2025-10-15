<script>
	import { HighlightAuto, LineNumbers } from 'svelte-highlight';
	import Nav from '../../../components/ui/nav.svelte';
	import { darkModeState, copyTextToClipboard, showToast } from '$lib/stores/index.js';
	// import { d } from 'svelte-highlight/languages/index.js';
	import { github, githubDark, atomOneDark } from 'svelte-highlight/styles';
	import Fa from 'svelte-fa';

	import {
		faFacebook,
		faHackerNews,
		faLinkedin,
		faReddit,
		faTwitter,
		faWhatsapp
	} from '@fortawesome/free-brands-svg-icons';
	import {
		faAngleLeft,
		faBackward,
		faCalendar,
		faCopy,
		faEdit,
		faExternalLinkSquare,
		faPen,
		faPenAlt,
		faUser
	} from '@fortawesome/free-solid-svg-icons';
	import { faCheck } from '@fortawesome/free-solid-svg-icons';
	import { onMount, setContext } from 'svelte';
	import SEO from '$components/ui/seoComp.svelte';
	import Footer from '$components/ui/footer.svelte';
	let { data } = $props();
	setContext('isOwner', false);
	if (data.isFound && data.session) {
		setContext('isOwner', data.session.user.id == data[0].user_id);
		// console.log(data.session.user.id == data[0].user_id);
	}

	// console.log(data[0])
	let username = data[0].profiles.username;
	// console.log(data.username.length);

	let copied = $state(false);
	let iconCopy = $derived(copied ? faCheck : faCopy);

	function CopyAction() {
		copied = true;
		copyTextToClipboard(data[0].code);
		setTimeout(() => {
			copied = false;
		}, 1000);
		showToast.set({ message: 'Code copied to clipboard' });
	}

	function convertLinkToRequestReadable(link) {
		// Encode the link using encodeURIComponent
		var encodedLink = encodeURIComponent(link);

		return encodedLink;
	}

	let encodedTitle = convertLinkToRequestReadable(data['0'].description);

	let url = $state();
	onMount(() => {
		url = window.location.href;
	});
</script>

<svelte:head>
	{#if data.isFound}
		<SEO
			title={data['0'].description}
			description={`${data[0].description.slice(0, 300)} - shared by ${username}`}
		/>
	{/if}

	{#if $darkModeState}
		{@html githubDark}
	{:else}
		{@html github}
	{/if}
</svelte:head>

<article class="flex min-h-screen flex-col">
	{#if data.isFound}
		<header class="w-full">
			<Nav />
		</header>
		<div class="h-full p-4 dark:bg-primary">
			<!-- <Fa icon={faPen} /> -->
			<div class="flex h-full w-full flex-col items-center justify-center text-sm md:text-sm">
				<div class="mb-2 flex flex-col items-center justify-center">
					<h1 class="pt-3 text-center text-2xl font-semibold">{data[0].description}</h1>
					<p>Shared by: <a href="/{username}">{username}</a></p>
				</div>
				<div class="relative h-full w-full rounded-lg p-4 text-[11px] md:w-[90%] md:text-base">
					<div
						class="absolute right-10 top-10 flex items-center justify-center text-base md:text-xl"
					>
						<p class="rounded bg-gray-100 p-2 text-sm dark:bg-primary">{data[0].lang}</p>
						<button class="p-2" onclick={CopyAction}><Fa icon={iconCopy} /></button>
					</div>
					<div>
						<HighlightAuto code={data[0].code} >
							{#snippet children({ highlighted })}
														<LineNumbers {highlighted} hideBorder />
																				{/snippet}
												</HighlightAuto>
					</div>

					<div
						class="prose prose-lg mt-6 flex max-w-full flex-col gap-2 dark:prose-invert prose-headings:w-fit prose-headings:underline prose-headings:underline-offset-2"
					>
						<!-- {JSON.stringify(data[0].markdown)} -->
						{@html data[0].markdown}
					</div>
				</div>
			</div>
		</div>
		<div class="my-8 flex w-full items-center justify-center p-3">
			<div
				class="flex w-full max-w-md items-center justify-between rounded-lg border border-b-2 bg-primary p-4 text-light dark:border-secondary-dark"
			>
				<span>Love it? Share it!</span>
				<div class="flex items-center justify-center space-x-3">
					<button
						onclick={() => {
							cp();
						}}><Fa icon={faCopy} /></button
					>
					<a
						href="https://twitter.com/share?url={convertLinkToRequestReadable(
							url
						)}%3Fref%3Dtwitter-share&amp;text={encodedTitle}"
						target="_blank"
						rel="noopener"
					>
						<span><Fa icon={faTwitter} /></span>
					</a>
					<a
						href="http://www.reddit.com/submit?url={url}&amp;title={encodedTitle}"
						target="_blank"
						rel="noopener"
					>
						<span><Fa icon={faReddit} /></span>
					</a>
					<a href="https://www.linkedin.com/cws/share?url={url}" target="_blank" rel="noopener">
						<span><Fa icon={faLinkedin} /></span>
					</a>
					<a
						href="http://news.ycombinator.com/submitlink?u={url}&amp;t={encodedTitle}"
						target="_blank"
						rel="noopener"
					>
						<Fa icon={faHackerNews} />
					</a>
					<a
						href="https://www.facebook.com/sharer/sharer.php?u={url}"
						target="_blank"
						rel="noopener"
					>
						<Fa icon={faFacebook} />
					</a>
					<a
						href="https://api.whatsapp.com/send?text={encodedTitle}%20{url}"
						target="_blank"
						rel="noopener"
					>
						<Fa icon={faWhatsapp} />
					</a>
				</div>
			</div>
		</div>
	{:else}
		<div class=" flex h-screen flex-col items-center justify-center">
			<h1 class="text-4xl font-bold md:text-5xl">404</h1>
			<p>Not found</p>
			<a class="rounded-md bg-sky-300 p-1" href="/dashboard">Home</a>
		</div>
	{/if}
</article>
<Footer />

<style>
	/* Hide the vertical scrollbar */
	::-webkit-scrollbar {
		width: 0;
	}

	/* Hide the horizontal scrollbar */
	::-webkit-scrollbar {
		height: 0;
	}
</style>
