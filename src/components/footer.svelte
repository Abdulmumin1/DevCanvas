<script>
	import Fa from 'svelte-fa';
	import { faGithub } from '@fortawesome/free-brands-svg-icons';
</script>

<footer class=" flex items-center justify-center">
	<div
		class=" m-3 flex w-full max-w-[1000px] flex-wrap items-center justify-center gap-2 rounded-[25px] border-sky-400 bg-gray-50 p-6 dark:bg-primary md:m-12 md:rounded-[29px] md:border-[2px]"
	>
		<div class="flex">
			<div class="flex flex-col space-y-2">
				<h3 class="flex items-center gap-2 text-2xl font-bold">
					DevCanvas

					<img
						src="/logo.svg"
						class="h-10 rounded-3xl bg-sky-200 p-2 grayscale"
						alt="SnippetLand Logo"
					/>
				</h3>
				<p class="md:max-w-[400px]">
					Online Editor with a collection of awesome frontend code and code snippets for developers
					of all levels.
				</p>
			</div>
		</div>

		<div class="mt-4 flex flex-row flex-wrap gap-2 md:gap-4">
			<div class="flex flex-col space-y-2">
				<h4 class="text-lg font-bold">Contact Us</h4>
				<ul class="">
					<li>
						<a href="mailto:abdulmuminyqn@gmail.com" class=" hover:underline"
							>abdulmuminyqn@gmail.com</a
						>
					</li>
					<li>
						<a href="https://twitter.com/@devcanvas_" class=" hover:underline">Twitter</a>
					</li>
					<li>
						<a href="https://github.com/Abdulmumin1/devcanvas/" class=" hover:underline">GitHub</a>
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

		<div class="flex flex-col flex-wrap gap-2">
			<div class="mt-4 flex flex-col justify-between">
				<p class="copyright text-sm">&copy; 2023 DevCanvas. All rights reserved.</p>
				<ul class="flex flex-row space-x-2">
					<li><a href="/privacy-policy" class=" hover:underline">Privacy Policy</a></li>
					<li><a href="/terms-of-service" class=" hover:underline">Terms of Service</a></li>
				</ul>
			</div>

			<div
				class="flex w-fit items-center justify-center rounded-lg bg-gray-200 p-2 text-center text-xs text-black dark:bg-primary dark:text-white md:text-sm"
			>
				Stand with Palestine 🇵🇸! DO NOT BE SILENCED
			</div>
		</div>
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
