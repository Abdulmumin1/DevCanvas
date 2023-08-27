<script>
	import Footer from '../components/footer.svelte';
	import LandingCodeEditor from '../components/landingCodeEditor.svelte';
	import Explore from '$lib/discover.gif';
	import CodeSharingJpeg from '$lib/codeSharing.gif';
</script>

<svelte:head>
	<!-- HTML Meta Tags -->
	<title>Snippets</title>

	<!-- Facebook Meta Tags -->
	<meta property="og:title" content="Snippets" />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:title" content="Snippets" />
</svelte:head>

<main class="bg-skyblue-500 relative min-h-screen flex items-center justify-center">
	<div class="w-full mx-auto py-12 rounded-lg flex flex-col gap-4">
		<!-- Add your landing page content here -->
		<h1 class="text-5xl md:text-6xl font-bold mb-3 text-center">
			Welcome to <span class="text-sky-400">Snippets</span>
		</h1>
		<p class="text-xl text-gray-700 text-center">
			Share and discover code snippets for various programming languages and use cases.
		</p>
		<div class="text-center">
			<a
				href="/signin"
				class="inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-6 rounded-lg"
				>Get Started</a
			>
			<a
				href="/explore"
				class="inline-block bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-6 rounded-lg"
				>Explore</a
			>
		</div>
		<div class="w-full">
			<!-- Add your features or benefits here -->
			<div class="p-4 h-[80vh] flex items-center justify-center">
				<div
					class="h-full flex flex-col-reverse md:flex-row gap-3 md:gap-6 items-center text-right"
				>
					<div class="h-full">
						<img src={Explore} alt="ga" class="h-full object-contain" />
					</div>
					<div class="">
						<h2 class=" font-semibold mb-2 text-4xl md:text-5xl">Explore Code Snippets</h2>
						<p>
							Discover code snippets contributed by the community and find solutions to coding
							challenges.
						</p>
					</div>
				</div>
			</div>

			<div class="p-4 h-[80vh] flex items-center justify-center">
				<div class="h-full flex flex-col md:flex-row gap-3 md:gap-6 items-center">
					<div class="flex flex-col justify-center">
						<h2 class="text-4xl md:text-5xl font-semibold mb-2">Easy Code Sharing</h2>
						<p>Share your exciting code snippets with just a few clicks</p>
					</div>
					<div class="h-full">
						<img src={CodeSharingJpeg} alt="ga" class=" h-full object-contain" />
					</div>
				</div>
			</div>

			<!-- Add code editor section -->
			<div class="p-4 h-[80vh] flex items-center justify-center">
				<div class="h-full flex flex-col md:flex-row gap-3 md:gap-6 items-center">
					<div class="">
						<h2 class=" font-semibold mb-2 text-4xl md:text-5xl">A Powerfull Code Editor</h2>
						<!-- <p>
							Discover code snippets contributed by the community and find solutions to coding
							challenges.
						</p> -->
					</div>

					<div class=" h-full">
						<img
							src="https://raw.githubusercontent.com/Abdulmumin1/media/main/snippetCodeEditorPreview.gif"
							alt="Editor Preview"
							class=" object-scale-down"
						/>
					</div>
				</div>
			</div>
		</div>
		<Footer />
	</div>
</main>

<style>
	/* Add Tailwind CSS styles here or import your main CSS file */
	/* main {
		background-color: #f0f4f8;
	} */
</style>
