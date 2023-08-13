<script>
	import CodeHighlight from '../components/codeHighlight.svelte';
</script>

<svelte:head>
	<!-- HTML Meta Tags -->
	<title>Snippets</title>

	<!-- Facebook Meta Tags -->
	<meta property="og:title" content="Snippets" />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:title" content="Snippets" />
</svelte:head>

<main class="bg-skyblue-500 min-h-screen flex items-center justify-center">
	<div class="max-w-4xl mx-auto px-8 sm:px-6 lg:px-8 py-12 rounded-lg">
		<!-- Add your landing page content here -->
		<h1 class="text-4xl font-bold mb-6 text-center">Welcome to Snippets</h1>
		<p class="text-xl text-gray-700 mb-8 text-center">
			Share and discover code snippets for various programming languages and use cases.
		</p>
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
			<!-- Add your features or benefits here -->
			<div class="bg-white rounded-lg p-4 shadow-md">
				<h2 class="text-xl font-semibold mb-2">Easy Code Sharing</h2>
				<p>Share your code with just a few clicks and get help from the community.</p>
			</div>
			<div class="bg-white rounded-lg p-4 shadow-md">
				<h2 class="text-xl font-semibold mb-2">Explore Code Snippets</h2>
				<p>
					Discover code snippets contributed by the community and find solutions to coding
					challenges.
				</p>
			</div>
		</div>
		<!-- Add a call-to-action button or signup form -->
		<div class="mt-10 text-center">
			<a
				href="/signin"
				class="inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md"
				>Get Started</a
			>
		</div>

		<!-- Add code editor section -->
		<div class="mt-12 bg-white shadow rounded-lg p-6">
			<h2 class="text-2xl font-semibold mb-4 text-center">A Powerfull Code Editor</h2>
			<div class="code-editor p-4 h-24">
				<!-- Your code editor component or integration goes here -->
				<!-- Replace the textarea below with your code editor component -->
				<CodeHighlight />
			</div>
			<p class="text-gray-600 text-center mt-2">
				Share the editor link with others to collaborate. <a href="/signin">Getting Started</a>
			</p>
		</div>
	</div>
</main>

<style>
	/* Add Tailwind CSS styles here or import your main CSS file */
	main {
		background-color: #f0f4f8;
	}
	.code-editor {
		/* Add styles for the code editor here */
		border: 1px solid #e2e8f0;
		border-radius: 0.5rem;
		min-height: 300px;
		font-family: 'Fira Code', monospace;
	}
</style>
