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
	import { scale } from 'svelte/transition';
	import { generateStructuredData } from '$lib/blog/utils.js';
	import { showToast } from '$lib/index.js';
	import SEO from '$components/seoComp.svelte';
	import GoUp from '$components/goUp.svelte';
	// import { Comment } from '@commentrig/svelte';
	// import { page } from '$app/stores';
	// import { page } from '$app/stores';

	let url;

	const entities = {
		title: data.meta.title,
		email: 'abdulmuminyqn@gmail.com',
		domain: 'https://devcanvas.dev',
		rich: true
	};

	function cp() {
		copyUrlToClipboard(url);
		showToast.set({ message: 'Link copied to clipboard', duration: 2000 });
	}

	onMount(() => {
		url = window.location.href;
		// let classes = document.querySelectorAll('pre');
		// classes.forEach((element) => {
		// 	let div = document.createElement('div');
		// 	div.classList = 'sticky top-0';
		// 	// div.style.marginBottom = '-23px';
		// 	let copyButton = document.createElement('button');
		// 	copyButton.innerText = 'copy';
		// 	copyButton.classList = ' px-4 py-1 rounded-t-lg  w-fit text-sm z-9999';
		// 	copyButton.onclick = () => {
		// 		copyUrlToClipboard(element.firstElementChild.innerText);
		// 		copyButton.innerText = 'copied';
		// 		setTimeout(() => {
		// 			copyButton.innerText = 'copy';
		// 		}, 2000);
		// 	};
		// 	element.classList.add('relative');

		// 	div.appendChild(copyButton);
		// 	element.appendChild(div);
		// });

		let stData = generateStructuredData({
			title: data.meta.title,
			datePublished: data.meta.date,
			description: data.meta.description,
			url
		});

		document.head.appendChild(stData);
		// console.log($page.url.pathname.startsWith('/blog/'));
	});

	let commentCount = 0;
	function convertLinkToRequestReadable(link) {
		// Encode the link using encodeURIComponent
		var encodedLink = encodeURIComponent(link);

		return encodedLink;
	}

	let encodedTitle = convertLinkToRequestReadable(data.meta.title);
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500&display=swap"
		rel="stylesheet"
	/>

	<SEO
		title={data.meta.title}
		description={data.meta?.description.slice(0, 250) || data.meta.title}
		index={data.meta?.published == true}
		imageUrl={data.meta?.thumbnail ??
			`https://devcanvas.art/og?message=${encodeURIComponent(data.meta.title)}`}
	/>
</svelte:head>

<article in:scale class="mx-auto flex flex-col gap-6 md:px-2 lg:px-4">
	<hgroup class="  relative flex w-full flex-col gap-3 rounded-lg dark:text-light">
		<aside class="">
			<a
				href="/blog"
				class=" flex items-center gap-1 text-sm transition-all duration-300 hover:gap-2"
				><span class="text-gray-800 dark:text-gray-300">
					<Fa icon={faAngleLeft} />
				</span>Back home</a
			>
		</aside>
		<div class="flex flex-col">
			<h1 class="title mb-4 mt-5 text-balance text-5xl font-bold md:text-6xl">
				{data.meta.title}
			</h1>
			<div class="flex flex-col gap-2">
				<div class="flex items-center gap-2 text-balance">
					<p class="text-sm">Published {formatDate(data.meta.date)}</p>
				</div>

				<div class="flex items-center gap-2 text-balance">
					<p class="text-sm">Written by: Abdulmumin Yaqeen</p>
					<a
						class="text-gray-800 dark:text-gray-100"
						href="https://www.yaqeen.me/about"
						target="_blank"><Fa icon={faExternalLinkSquare} /></a
					>
				</div>
			</div>
		</div>

		{#if data.meta.date != data.meta.lastmod}
			<div class="mt-5 flex items-center gap-2 text-sm">
				<div class="text-gray-800 dark:text-gray-100">
					<Fa icon={faPen} />
				</div>
				Last Edited:
				{formatDate(data.meta.lastmod)}
			</div>
		{/if}
	</hgroup>

	<div
		class="markdown-content article space-y-8 font-public-sans font-light text-[#404953] dark:text-light"
	>
		<svelte:component this={data.content} />
	</div>

	<div class="flex flex-wrap items-center gap-3">
		Tagged with:
		{#each data.meta.categories as tag}
			<!-- <span class="px-3 py-1 text-light rounded-lg bg-secondary-dark font-light text-sm"
				>&num;{tag}</span
			> -->

			<span class="rounded-md bg-gray-100 px-2 py-1 dark:bg-secondary-dark">{tag}</span>
		{/each}
	</div>

	<div class="flex w-full items-center justify-center p-3">
		<div
			class="flex w-full max-w-md items-center justify-between rounded-lg border border-b-2 bg-primary p-4 text-light dark:border-secondary-dark"
		>
			<span>Love it? Share it!</span>
			<div class="flex items-center justify-center space-x-3">
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

<GoUp content=".article" />

<style lang="postcss">
	/* .article > h1,
	h2,
	h3 {
		@apply text-gray-800 dark:text-gray-100;
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
	/* .article {
		font-family: 'carbon';
	} */

	.title {
		/* font-family: Roboto slab; */
		font-family: 'Rubik', serif !important;
	}

	.fd {
		min-height: 180px;
		display: flex;
		/* align-items: center; */
		justify-content: end;
		/* text-align: center; */
	}
	.article {
		/* font-size: 1.4rem !important; */
	}
</style>
