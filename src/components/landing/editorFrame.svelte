<script>
	import { faCss3, faHtml5, faJs } from '@fortawesome/free-brands-svg-icons';
	import Fa from 'svelte-fa';

	let { title, children } = $props();
</script>

<section class="w-full max-w-[1000px] p-2 md:w-[90%]">
	<header>
		<nav>
			<ul>
				<li>
					<div class="flex flex-col gap-1 text-sm">
						<p style="margin-bottom: -7px;" class="text-sm capitalize text-light md:text-xl">
							{title}
						</p>
						<p
							class="rounded-lg p-1 text-sky-400 outline-none focus:outline-sky-300 dark:text-sky-300 focus:dark:outline-sky-400"
							spellcheck="false"
						>
							<span>by</span>
							<a class="text-light" href={`/nuur`}>@nuur</a>
						</p>
					</div>
				</li>
			</ul>
		</nav>
	</header>
	<div id="main" class="bg-secondary dark:bg-secondary-dark dark:text-secondary">
		<section id="editor">
			<div class="flex gap-2">
				<button class="flex items-center justify-center gap-1 p-2"
					><span class="text-rose-500"><Fa icon={faHtml5} /></span>HTML</button
				>
				<button class="flex items-center justify-center gap-1 p-2">
					<span class="text-blue-500"><Fa icon={faCss3} /></span>CSS
				</button>

				<button class="flex items-center justify-center gap-1 p-2">
					<span class="text-yellow-500"><Fa icon={faJs} /></span>JS
				</button>
			</div>

			<div class=" flex h-full flex-col gap-2 p-1">
				<div class="h-4 w-[90%] animate-pulse rounded-3xl bg-gray-300"></div>
				<div class="h-4 w-[50%] animate-pulse rounded-3xl bg-gray-300"></div>
				<div class="h-4 w-[30%] animate-pulse rounded-3xl bg-gray-300"></div>
				<div class="h-4 w-[50%] animate-pulse rounded-3xl bg-gray-300"></div>
				<div class="h-4 w-[64%] animate-pulse rounded-3xl bg-gray-300"></div>
				<div class="h-4 w-[80%] animate-pulse rounded-3xl bg-gray-300"></div>
				<div class="h-4 w-[30%] animate-pulse rounded-3xl bg-gray-300"></div>
				<div class="h-4 w-[64%] animate-pulse rounded-3xl bg-gray-300"></div>
				<div class="h-4 w-[70%] animate-pulse rounded-3xl bg-gray-300"></div>
				<div class="h-4 w-[50%] animate-pulse rounded-3xl bg-gray-300"></div>
				<div class="h-4 w-[64%] animate-pulse rounded-3xl bg-gray-300"></div>
				<div class="h-4 w-[80%] animate-pulse rounded-3xl bg-gray-300"></div>
				<div class="h-4 w-[30%] animate-pulse rounded-3xl bg-gray-300"></div>
			</div>
		</section>
		<section id="preview" class="flex h-full items-center justify-center">
			{@render children?.()}
		</section>
	</div>
</section>

<style>
	/* Reset some default styles */

	header {
		background-color: #333;
		color: #fff;
		padding: 10px;
	}

	nav ul {
		list-style: none;
	}

	nav ul li {
		display: inline;
	}

	nav ul li a {
		color: #fff;
		text-decoration: none;
	}

	#preview {
		flex: 1;
		background-color: white;
	}
	#main {
		display: flex;
		flex-wrap: wrap;
		height: 430px;
	}

	#editor {
		flex: 1;
	}
</style>
