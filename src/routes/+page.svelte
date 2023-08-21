<script>
	import Footer from '../components/footer.svelte';
	import LandingCodeEditor from '../components/landingCodeEditor.svelte';
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
		</div>
		<div class="w-full bg-sky-300">
			<!-- Add your features or benefits here -->
			<div class=" p-4 h-[60vh] flex flex-col justify-center">
				<h2 class="text-4xl md:text-5xl font-semibold mb-2">Easy Code Sharing</h2>
				<p>Share your exciting code snippets with just a few clicks</p>
			</div>
			<div class="p-4 h-[60vh] flex flex-col justify-center bg-purple-400 text-right">
				<h2 class=" font-semibold mb-2 text-4xl md:text-5xl">Explore Code Snippets</h2>
				<p>
					Discover code snippets contributed by the community and find solutions to coding
					challenges.
				</p>
			</div>
			<!-- Add code editor section -->
			<div
				class="flex p-6 flex-col md:flex-row mb-12 gap-3 h-[60vh] md:h-[90vh] justify-center items-center bg-white"
			>
				<h2 class="text-4xl md:text-5xl font-semibold text-center">A Powerfull Code Editor</h2>
				<div class="code-editor h-full w-full p-3">
					<!-- Your code editor component or integration goes here -->
					<!-- Replace the textarea below with your code editor component -->
					<div class="h-full flex flex-col p-2 gap-2">
						<div class="h-full w-full">
							<img
								src="https://raw.githubusercontent.com/Abdulmumin1/media/main/snippetCodeEditorPreview.gif"
								alt="Editor Preview"
								class="h-full w-full object-scale-down rounded-md"
							/>
						</div>
						<p class="text-gray-600 text-sm md:text-base text-center mt-2">
							Share the editor link with others to collaborate. <a href="/signin">Getting Started</a
							>
						</p>
					</div>
				</div>
			</div>
		</div>
		<Footer />
	</div>
</main>

<style>
	/* Add Tailwind CSS styles here or import your main CSS file */
	main {
		background-color: #f0f4f8;
	}
</style>
