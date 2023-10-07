<script>
	import { scale, slide } from 'svelte/transition';
	import BlogCard from '$components/blog/blogCard.svelte';

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

<section in:scale class="min-h-screen">
	<article class="h-full w-full flex justify-center items-center flex-col">
		<div class=" max-w-[1200px] flex flex-col w-full h-full p-4 gap-4 items-center">
			<div
				class="header flex flex-col text-center gap-4 h-[70dvh] justify-center items-center dark:text-light"
			>
				<h1 class="text-6xl">Snippet<span class="text-sky-500">Land</span></h1>
				<p class="max-w-[600px]">
					In an era where information reigns supreme, sometimes it's the small pieces that hold the
					most significant secrets. Enter the realm of SNIPPETLAND, a place where tiny treasures of
					knowledge, wisdom, and inspiration come to life.
				</p>

				<form
					class="flex flex-col gap-2 items-center justify-center bg-sky-200 dark:bg-secondary-dark w-full p-6 rounded-2xl"
				>
					<input
						type="email"
						name="subscriber-email"
						id=""
						placeholder="name@example.com"
						class="w-full p-3 rounded-md"
					/>
					<input
						type="submit"
						value="subscribe"
						class="bg-sky-500 text-primary px-6 cursor-pointer py-3 rounded-md"
					/>
				</form>
			</div>
			<div
				class="flex gap-4 h-full md:h-[80dvh] flex-col w-full items-center justify-center md:flex-row"
			>
				<!-- 			
				<div class="h-full text-6xl flex flex-col gap-3 w-full md:w-3/4">
					<BlogCard details={data.posts[0]} latest={true} />
				</div>
				<div class="h-full flex flex-col w-full md:w-3/12 gap-2">
					{#each data.posts.splice(1, 2) as post (post.slug)}
						<BlogCard details={post} />
					{:else}
					{/each}
				</div> -->
				<p class="text-5xl">In progress!</p>
			</div>
		</div>
	</article>
</section>
