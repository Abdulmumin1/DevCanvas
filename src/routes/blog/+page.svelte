<script>
	import { scale, slide } from 'svelte/transition';
	import { onMount } from 'svelte';
	import BlogCard from '$components/blog/blogCard.svelte';
	import InnerNav from '$components/ui/innerNav.svelte';
	import LatestBlog from '$components/blog/latestBlog.svelte';
	import Pagination from '$components/blog/pagination.svelte';
	import SEO from '$components/ui/seoComp.svelte';

	export let data;

	let currentPage = 1;
	let postsPerPage = 9;
	let totalPages;
	let paginatedPosts = [];

	$: {
		totalPages = Math.ceil((data.posts.length - 1) / postsPerPage);
		paginatedPosts = data.posts
			.slice(1)
			.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);
	}

	function handlePageChange(newPage) {
		currentPage = newPage;
	}

	onMount(() => {
		window.scrollTo(0, 0);
	});
</script>

<svelte:head>
	<SEO title="Blog - Devcanvas" description="Frontend articles for beginners" />
</svelte:head>

<section class="min-h-screen">
	<InnerNav />
	<article class="center flex h-full w-full flex-col items-center">
		<div class="mt-12 flex h-full w-full max-w-[1200px] flex-col gap-4 p-4 md:px-12">
			<div class="mb-20 flex h-full w-full flex-col gap-4 md:min-h-[100dvh]">
				{#if data.posts.length > 0}
					<h1 class="text-3xl">Latest Post</h1>
					<div class="flex w-full flex-col gap-3 text-6xl">
						<LatestBlog details={data.posts[0]} />
					</div>

					<h2 class="mt-8 text-2xl">More Posts</h2>
					<div
						class="relative grid h-full w-full grid-cols-1 flex-col gap-3 md:grid-cols-2 lg:grid-cols-3"
					>
						{#each paginatedPosts as post (post.slug)}
							<BlogCard details={post} />
						{/each}
					</div>

					<Pagination {currentPage} {totalPages} onPageChange={handlePageChange} />
				{:else}
					<p>Nothing to show</p>
				{/if}
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
