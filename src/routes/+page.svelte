<script>
	import Footer from '../components/footer.svelte';
	import Explore from '$lib/discover.gif';
	import CodeSharingJpeg from '$lib/codeSharing.gif';
	import InnerNav from '../components/innerNav.svelte';
	import { faAngleDown, faRightLong, faStar } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import newImg from '$lib/snippetsLandEditorPreview.png';
	import SectionCard from '../components/landing/sectionCard.svelte';
	import Accodion from '../components/landing/accodion.svelte';
	import { fade } from 'svelte/transition';
</script>

<svelte:head>
	<!-- HTML Meta Tags -->
	<title>Snippets</title>

	<!-- Facebook Meta Tags -->
	<meta property="og:title" content="Snippets" />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:title" content="Snippets" />
</svelte:head>

<main class="bg-skyblue-500 min-h-screen flex flex-col items-center justify-center">
	<div class="w-full">
		<InnerNav />
	</div>
	<div class="w-full mx-auto py-12 rounded-lg flex flex-col gap-4 justify-center items-center">
		<!-- Add your landing page content here -->
		<p>
			<a
				href="https://github.com/Abdulmumin1/snippets"
				class="flex items-center justify-center gap-2 rounded-3xl bg-sky-100 p-2 px-4"
			>
				Star us on github <Fa icon={faStar} />
			</a>
		</p>
		<h1 class="text-5xl md:text-6xl font-bold mb-3 text-center">
			Welcome to <span class="text-sky-400">SnippetLand</span>
		</h1>
		<p class="text-xl text-gray-700 text-center max-w-lg">
			The platform for effortlessly sharing, collaborating, and discovering code snippets. <span
				class="text-rose-400">share</span
			>,
			<span class="text-orange-600">learn</span>, and
			<span class="bg-sky-300">build together</span>.
		</p>
		<div class="text-center">
			<a
				href="/signin"
				class="inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-6 rounded-lg"
				>Get Started</a
			>
			<a
				href="/explore"
				class="inline-block bg-secondary-dark text-white font-semibold py-3 px-6 rounded-lg"
				>Explore</a
			>
		</div>
		<div class="w-full">
			<!-- Add your features or benefits here -->
			<SectionCard>
				<div class="h-full">
					<img src={Explore} alt="ga" class="h-full object-contain" />
				</div>
				<div class="">
					<h2 class=" font-semibold mb-2 text-4xl md:text-5xl">Explore Code Snippets</h2>
					<p class="max-w-md">
						Explore a diverse library of code snippets contributed by developers like you. From
						simple solutions to complex algorithms, SnippetLand is your go-to resource for finding
						inspiration, solving problems, and learning new techniques
					</p>
				</div>
			</SectionCard>

			<SectionCard>
				<div class="flex flex-col justify-center">
					<h2 class="text-4xl md:text-5xl font-semibold mb-2">Easy Code Sharing</h2>
					<p class="max-w-md">
						Got a brilliant code snippet that could help others? Share it with the community! Our
						intuitive interface lets you upload your code snippets in a snap.
					</p>
				</div>
				<div class="h-full">
					<img src={CodeSharingJpeg} alt="ga" class=" h-full object-contain" />
				</div>
			</SectionCard>

			<div class=" bg-secondary-dark h-fit md:h-[60vh] mb-8 flex p-7 py-9 justify-center">
				<div class="w-full flex flex-col md:flex-row gap-6 justify-between max-w-5xl">
					<div class="flex justify-center flex-col">
						<h2 class="text-4xl md:text-5xl font-semibold mb-2 text-white">Support for</h2>
						<p class="text-light">
							From JavaScript to Python, HTML to CSS, SnippetLand support a wide range of
							programming languages
						</p>
					</div>
					<div>
						<ul class="grid grid-cols-3 gap-6">
							<li class="flex flex-col text-center text-xl shadow p-3 rounded-md bg-white">
								Python
								<img
									class=" w-24 h-24"
									src="https://cdn.svgporn.com/logos/python.svg"
									alt="python"
								/>
							</li>
							<li class="flex flex-col text-center text-xl shadow p-3 rounded-md bg-white">
								JavaScript
								<img
									class=" w-24 h-24"
									src="https://cdn.svgporn.com/logos/javascript.svg"
									alt="python"
								/>
							</li>
							<li class="flex flex-col text-center text-xl shadow p-3 rounded-md bg-white">
								HTML
								<img
									class=" w-24 h-24"
									src="https://cdn.svgporn.com/logos/html-5.svg"
									alt="python"
								/>
							</li>
							<li class="flex flex-col text-center text-xl shadow p-3 rounded-md bg-white">
								CSS
								<img
									class=" w-24 h-24"
									src="https://cdn.svgporn.com/logos/css-3.svg"
									alt="python"
								/>
							</li>

							<li class="flex flex-col text-center text-xl shadow p-3 rounded-md bg-white">
								Rust
								<img class=" w-24 h-24" src="https://cdn.svgporn.com/logos/rust.svg" alt="rust" />
							</li>

							<li class="flex flex-col justify-center text-2xl shadow p-3 rounded-md bg-white">
								And<br />
								More ..
								<!-- <img class=" w-24 h-24" src="https://cdn.svgporn.com/logos/rust.svg" alt="rust" /> -->
							</li>
						</ul>
					</div>
				</div>
			</div>
			<!-- Add code editor section -->
			<div class="px-4 h-fit md:h-screen flex items-center justify-center">
				<div class="h-full flex flex-col gap-3 md:gap-6 items-center">
					<div class="flex flex-col items-center justify-center">
						<h2 class=" font-semibold mb-2 text-4xl md:text-6xl">A Powerfull Code Editor</h2>
						<p class="max-w-lg text-center">
							Bring your coding projects to life with real-time collaboration. Our built-in
							collaborative code editor powered by VSCode lets you write code more seamlessly, Every
							of your vscode thingy just works.
						</p>
					</div>

					<div class="rounded-t-3xl overflow-hidden">
						<!-- src="https://raw.githubusercontent.com/Abdulmumin1/media/main/snippetCodeEditorPreview.gif" -->
						<img src={newImg} alt="Editor Preview" class="  rounded-4xl" />
					</div>
				</div>
			</div>

			<!-- The Idea-->
			<div class=" bg-secondary-dark h-fit md:h-[400px] flex items-center p-7 py-9">
				<div class="h-full flex flex-col gap-3 md:gap-6 items-center justify-center">
					<div class="">
						<h2 class=" font-semibold mb-2 text-white text-5xl md:text-6xl">The Idea</h2>
						<p class="max-w-md text-light text-base md:text-lg">
							You're working on some project, you wrote a really interesting piece & you want to
							share it with the community. <br />
							Or, maybe you want some help on something you're working on and you're requested to share
							the code snippet so they can have a look
						</p>
						<a
							href="/signin"
							class="text-sm flex w-fit items-center justify-center gap-2 px-7 py-4 mt-3 bg-sky-400 rounded-lg hover:scale-110 transition-transform duration-300"
							>Get Started <Fa icon={faRightLong} /></a
						>
					</div>
				</div>
			</div>

			<!-- The Idea-->
			<div class=" h-fit flex items-center justify-center p-7 py-9">
				<div class="h-full flex flex-col gap-3 md:gap-6 items-center justify-center">
					<div class="flex flex-col items-center justify-center gap-6">
						<h2 class="max-w-lg text-center font-semibold mb-2 text-4xl md:text-6xl">Wondering?</h2>
						<p class="max-w-lg text-center text-sky-dark text-xl">
							Here are list of question we think you might want answers for.
						</p>

						<ul class=" flex gap-6 flex-col">
							<Accodion title="Can the editor execute code?" content="Still Building!" />

							<Accodion title="Is it a language specific platform?" content="Still Building!" />

							<Accodion
								title="Why not just github instead of SnippetLand?"
								content="Still Building!"
							/>

							<Accodion title="Is snippetsLand 100% open source?" content="Still Building	" />
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
	<Footer />
</main>

<style>
	/* Add Tailwind CSS styles here or import your main CSS file */
	/* main {
		background-color: #f0f4f8;
	} */
</style>
