<script>
	import Fa from 'svelte-fa';
	import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
	import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
</script>

<footer class="border-t border-t-primary bg-gray-100 py-12 dark:bg-secondary-dark">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
			<!-- Company Info -->
			<div class="space-y-4">
				<h3 class="flex items-center gap-2 text-2xl font-bold text-sky-500 dark:text-sky-400">
					DevCanvas
					<img src="/logo.svg" class="h-8 w-8" alt="DevCanvas Logo" />
				</h3>
				<p class="max-w-md text-gray-600 dark:text-gray-300">
					Online Editor with a collection of awesome frontend code and code snippets for developers
					of all levels.
				</p>
				<div class="flex space-x-4">
					<a
						href="https://github.com/Abdulmumin1/devcanvas/"
						class="text-gray-400 hover:text-sky-500 dark:hover:text-sky-400"
					>
						<Fa icon={faGithub} size="1.5x" />
					</a>
					<a
						href="https://twitter.com/@devcanvas_"
						class="text-gray-400 hover:text-sky-500 dark:hover:text-sky-400"
					>
						<Fa icon={faTwitter} size="1.5x" />
					</a>
					<a
						href="mailto:abdulmuminyqn@gmail.com"
						class="text-gray-400 hover:text-sky-500 dark:hover:text-sky-400"
					>
						<Fa icon={faEnvelope} size="1.5x" />
					</a>
				</div>
			</div>

			<!-- Quick Links -->
			<div class="space-y-4">
				<h4 class="text-lg font-semibold text-gray-900 dark:text-white">Quick Links</h4>
				<ul class="space-y-2">
					{#each ['Home', 'Blog', 'Online Editor', 'About'] as link}
						<li>
							<a
								href="/{link.toLowerCase().replace(' ', '-')}"
								class="text-gray-600 transition-colors duration-300 hover:text-sky-500 dark:text-gray-300 dark:hover:text-sky-400"
							>
								{link}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Legal and Support -->
			<div class="space-y-4">
				<h4 class="text-lg font-semibold text-gray-900 dark:text-white">Legal & Support</h4>
				<ul class="space-y-2">
					{#each ['Privacy Policy', 'Terms of Service'] as link}
						<li>
							<a
								href="/{link.toLowerCase().replaceAll(' ', '-')}"
								class="text-gray-600 transition-colors duration-300 hover:text-sky-500 dark:text-gray-300 dark:hover:text-sky-400"
							>
								{link}
							</a>
						</li>
					{/each}
				</ul>
				<div class="mt-6">
					<div
						class="rounded-full bg-gray-200 p-3 text-sm text-gray-800 dark:bg-gray-800 dark:text-gray-300"
					>
						Stand with Palestine 🇵🇸! DO NOT BE SILENCED
					</div>
				</div>
			</div>
		</div>

		<div class="mt-8 border-t border-gray-200 pt-8 dark:border-gray-700">
			<p class="text-center text-sm text-gray-400 dark:text-gray-500">
				&copy; {new Date().getFullYear()} DevCanvas. All rights reserved.
			</p>
		</div>
	</div>
</footer>

<style>
	/* Any additional custom styles can be added here */
</style>
