<script>
	import { onMount } from 'svelte';
	export let data;
	import { formatDate, copyUrlToClipboard } from '$lib/utils/utils.js';
	import Fa from 'svelte-fa';
	import {
		faFacebook,
		faHackerNews,
		faLinkedin,
		faReddit,
		faTwitter,
		faWhatsapp
	} from '@fortawesome/free-brands-svg-icons';
	import { faCalendar, faCopy } from '@fortawesome/free-solid-svg-icons';
	import { scale } from 'svelte/transition';
	import { generateStructuredData } from '$lib/blog/utils.js';
	import { showToast } from '$lib/index.js';

	// import { page } from '$app/stores';
	// import { page } from '$app/stores';

	let url;

	function cp() {
		copyUrlToClipboard(url);
		showToast.set({ message: 'Link copied to clipboard', duration: 2000 });
	}

	onMount(() => {
		url = window.location.href;
		let classes = document.querySelectorAll('pre');
		classes.forEach((element) => {
			let div = document.createElement('div');
			div.classList = 'sticky top-0';
			// div.style.marginBottom = '-23px';
			let copyButton = document.createElement('button');
			copyButton.innerText = 'copy';
			copyButton.classList = ' px-4 py-1 rounded-t-lg  w-fit z-9999';
			copyButton.onclick = () => {
				copyUrlToClipboard(element.firstElementChild.innerText);
				copyButton.innerText = 'copied';
				setTimeout(() => {
					copyButton.innerText = 'copy';
				}, 2000);
			};
			element.classList.add('relative');

			div.appendChild(copyButton);
			element.appendChild(div);
		});

		let stData = generateStructuredData({
			title: data.meta.title,
			datePublished: data.meta.date,
			description: data.meta.description,
			url
		});

		document.head.appendChild(stData);
		// console.log($page.url.pathname.startsWith('/blog/'));
	});

	function convertLinkToRequestReadable(link) {
		// Encode the link using encodeURIComponent
		var encodedLink = encodeURIComponent(link);

		return encodedLink;
	}

	let encodedTitle = convertLinkToRequestReadable(data.meta.title);
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500&display=swap"
		rel="stylesheet"
	/>

	<meta name="description" content={data.meta?.description} />

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content="https://devcanvas.art/blog" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={data.meta.title} />
	<meta property="og:description" content={data.meta?.description} />
	<meta
		property="og:image"
		content={data.meta?.thumbnail ??
			`https://devcanvas.art/og?message=${encodeURIComponent(data.meta.title)}`}
	/>

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="devcanvas.art" />
	<meta property="twitter:url" content="https://devcanvas.art" />
	<meta name="twitter:title" content={data.meta.title} />
	<meta name="twitter:description" content={data.meta?.description || data.meta.title} />
	<meta
		name="twitter:image"
		content={`https://devcanvas.art/og?message=${encodeURIComponent(data.meta.title)}`}
	/>

	{#if data.meta?.published}
		<meta name="robots" content="index, follow" />
	{/if}
</svelte:head>

<article in:scale class="mx-auto flex flex-col gap-6 md:px-2 lg:px-4">
	<hgroup class="  dark:text-light flex rounded-lg w-full flex-col gap-3 relative">
		<div class="flex gap-4 flex-col fd">
			<h1 class="text-3xl md:text-5xl title text-balance">
				{data.meta.title}
			</h1>
			<div class="text-balance">
				<!-- <Fa icon={faCalendar} /> -->
				<p class="text-sm">Published {formatDate(data.meta.date)} by Abdulmumin Yaqeen</p>
			</div>
		</div>
	</hgroup>

	<div class="space-y-8 markdown-content font-light text-[#404953] dark:text-light article">
		<svelte:component this={data.content} />
	</div>

	<div class="flex gap-3 flex-wrap">
		Tags:
		{#each data.meta.categories as tag}
			<span class="px-3 py-1 text-light rounded-lg bg-secondary-dark font-light text-sm"
				>&num;{tag}</span
			>
		{/each}
	</div>

	<div class="w-full flex items-center justify-center p-3">
		<div
			class="w-full flex justify-between max-w-md items-center border border-b-2 rounded-lg bg-primary text-light dark:border-secondary-dark p-4"
		>
			<span>Love it? Share it!</span>
			<div class="flex space-x-3 items-center justify-center">
				<button
					on:click={() => {
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
				<a href="https://www.facebook.com/sharer/sharer.php?u={url}" target="_blank" rel="noopener">
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
</article>

<style lang="postcss">
	/* .article > h1,
	h2,
	h3 {
		@apply text-sky-500 dark:text-sky-300;
	} */
	.article::before {
		content: '';
		background: rgb(56, 189, 248);
		background: linear-gradient(
			326deg,
			rgba(56, 189, 248, 1) 0%,
			rgba(169, 227, 252, 1) 16%,
			rgba(212, 241, 254, 1) 22%,
			rgba(125, 211, 252, 1) 86%,
			rgba(125, 211, 252, 1) 93%
		);
		position: absolute;
		top: 0;
		left: 0;
		right: 0;

		width: 100%;
		z-index: 0;
	}
	.article {
		font-family: 'Dai Banna SIL';
	}

	.title {
		font-family: Roboto slab;
	}

	.fd {
		height: 230px;
		display: flex;
		/* align-items: center; */
		justify-content: center;
		/* text-align: center; */
	}
	.article {
		font-size: 1.4em !important;
	}
</style>
