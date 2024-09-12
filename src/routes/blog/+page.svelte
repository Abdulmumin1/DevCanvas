<script>
	import { scale, slide } from 'svelte/transition';
	import BlogCard from '$components/blog/blogCard.svelte';
	import InnerNav from '$components/innerNav.svelte';
	import LatestBlog from '../../components/blog/latestBlog.svelte';

	export let data;
</script>

<svelte:head>
	<!-- Meta Tags Generated via https://www.opengraph.xyz -->

	<!-- HTML Meta Tags -->
	<title>Blog - DevCanvas</title>
	<meta name="description" content="Dev Canvas - Online HTML/CSS/JS/SCSS Editor" />

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content="https://devcanvas.art" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Devcanvas" />
	<meta property="og:description" content="Devcanvas - Online HTML/CSS/JS/SCSS Editor" />
	<meta property="og:image" content="/devcanvas.png" />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="devcanvas.art" />
	<meta property="twitter:url" content="https://devcanvas.art" />
	<meta name="twitter:title" content="Devcanvas" />
	<meta name="twitter:description" content="Devcanvas - Online HTML/CSS/JS/SCSS Editor" />
	<meta name="twitter:image" content="/devcanvas.png" />
</svelte:head>

<section class="min-h-screen">
	<InnerNav />
	<article class="-center flex h-full w-full flex-col items-center">
		<!-- <h1 class="py-12 text-3xl md:text-6xl">DevCanvas Blog</h1> -->
		<div class=" mt-12 flex h-full w-full max-w-[1200px] flex-col gap-4 p-4 md:px-12">
			<div class="mb-20 flex h-full w-full flex-col gap-4 md:min-h-[100dvh]">
				{#if data.posts.length > 0}
					<h1 class="text-3xl">Latest Post</h1>
					<div class="  flex w-full flex-col gap-3 text-6xl">
						<LatestBlog details={data.posts[0]} />
					</div>
					<!-- <div class="h-full flex flex-col w-full  gap-2">
						{#each data.posts.splice(1, 2) as post (post.slug)}
							<BlogCard details={post} />
						{:else}
							<p>Nothing to show</p>
						{/each}
					</div> -->

					<div class="relative flex h-full w-full flex-col gap-3">
						{#each data.posts.splice(1, data.posts.length) as post (post.slug)}
							<BlogCard details={post} />
						{/each}
					</div>
				{:else}
					<p>Nothing to show</p>
				{/if}
				<!-- <p class="text-5xl">In progress!</p> -->
			</div>
		</div>
	</article>
</section>

<style>
	.customGrid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 2rem;
	}
</style>
