<script>
	import Fa from 'svelte-fa';
	import { faGithub } from '@fortawesome/free-brands-svg-icons';
</script>

<footer class="bg-gray-200 text-black px-4 py-8">
	<div class="flex gap-2">
		<div class="flex flex-col space-y-2">
			<h3 class="text-2xl font-bold flex items-center gap-2">
				DevCanvas

				<img
					src="/logo.svg"
					class="bg-sky-200 p-2 rounded-3xl h-10 grayscale"
					alt="SnippetLand Logo"
				/>
			</h3>
			<p>
				Online Editor with a collection of awesome frontend code and code snippets for developers of
				all levels.
			</p>
		</div>
	</div>

	<div class="flex flex-row gap-12 mt-4">
		<div class="flex flex-col space-y-2">
			<h4 class="text-lg font-bold">Contact Us</h4>
			<ul class="">
				<li>
					<a href="mailto:abdulmuminyqn@gmail.com" class=" hover:underline"
						>abdulmuminyqn@gmail.com</a
					>
				</li>
				<li>
					<a href="https://twitter.com/snippetlandIO" class=" hover:underline">Twitter</a>
				</li>
				<li>
					<a href="https://github.com/Abdulmumin1/snippetland/" class=" hover:underline">GitHub</a>
				</li>
			</ul>
		</div>

		<div class="flex flex-col space-y-2">
			<h4 class="text-lg">Links</h4>
			<ul class="">
				<li><a href="/" class=" hover:underline">Home</a></li>
				<li><a href="/blog" class=" hover:underline">Blog</a></li>
				<li><a href="/play" class=" hover:underline">Online Editor</a></li>
				<li><a href="/about" class=" hover:underline">About</a></li>
			</ul>
		</div>
	</div>

	<div class="flex flex-col justify-between mt-4">
		<p class="text-sm copyright">&copy; 2023 DevCanvas. All rights reserved.</p>
		<ul class="flex flex-row space-x-2">
			<li><a href="/privacy-policy" class=" hover:underline">Privacy Policy</a></li>
			<li><a href="/terms-of-service" class=" hover:underline">Terms of Service</a></li>
		</ul>
	</div>
</footer>

<style>
	* {
		font-weight: 400;
	}

	h3,
	h4 {
		font-weight: 500;
	}
</style>
