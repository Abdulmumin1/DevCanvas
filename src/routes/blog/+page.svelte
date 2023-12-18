<script>
	import { scale, slide } from 'svelte/transition';
	import BlogCard from '$components/blog/blogCard.svelte';
	import InnerNav from '$components/innerNav.svelte';

	export let data;
</script>

<svelte:head>
	<!-- Meta Tags Generated via https://www.opengraph.xyz -->

	<!-- HTML Meta Tags -->
	<title>Blog - SnippetLand</title>
	<meta name="description" content="A creative, curiosity-driven developer & writer" />

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content="https://www.yaqeen.me" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Abdulmumin Yaqeen" />
	<meta property="og:description" content="A creative, curiosity-driven developer & writer" />
	<meta property="og:image" content="https://i.ibb.co/nPW10cf/abdul.png" />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="yaqeen.me" />
	<meta property="twitter:url" content="https://www.yaqeen.me" />
	<meta name="twitter:title" content="Abdulmumin Yaqeen" />
	<meta name="twitter:description" content="A creative, curiosity-driven developer & writer" />
	<meta name="twitter:image" content="https://i.ibb.co/nPW10cf/abdul.png" />
</svelte:head>

<InnerNav />
<section in:scale class="min-h-screen">
	<article class="h-full w-full flex justify-center items-center flex-col">
		<div class=" max-w-[1200px] justify-center flex flex-col w-full h-full p-4 gap-4 items-center">
			<div class="flex gap-4 h-full md:min-h-[100dvh] flex-col w-full justify-center">
				{#if data.posts.length > 0}
					<h1 class="text-3xl">Latest Post</h1>
					<div class=" bg-sky-300 p-2 text-black text-6xl flex flex-col gap-3 w-full">
						<BlogCard details={data.posts[0]} latest={true} />
					</div>
					<!-- <div class="h-full flex flex-col w-full  gap-2">
						{#each data.posts.splice(1, 2) as post (post.slug)}
							<BlogCard details={post} />
						{:else}
							<p>Nothing to show</p>
						{/each}
					</div> -->

					<div class="h-full customGrid w-full px-4">
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
