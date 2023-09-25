<script>
	import SectionCard from './sectionCard.svelte';
	import Explore from '$lib/exploreNew.gif';
	import ExploreDark from '$lib/exploreNewDark.gif';
	import { darkModeState } from '$lib/index.js';
</script>

<div class="w-full flex items-center justify-center">
	<div class="flex gap-3 flex-col md:flex-row max-w-4xl">
		<div
			class="bg-gray-50 dark:bg-secondary-dark p-4 shadow shadow-primary rounded flex flex-col gap-3"
		>
			<h1 class="text-xl md:text-3xl">For CREATIVES</h1>
			<p>
				"Dive into a world of endless possibilities at [Your Platform Name]. We're here to fuel your
				creative fire by offering a platform where you can seamlessly blend code and art. Express
				your unique style, collaborate with like-minded creatives, and let your creativity shine.
				Join us and let's craft something extraordinary together."
			</p>
		</div>

		<div
			class="bg-gray-50 dark:bg-secondary-dark p-4 shadow shadow-primary rounded flex flex-col gap-3"
		>
			<h1 class="text-xl md:text-3xl">For EVERONE</h1>
			<p>
				"Coding is no longer exclusive - it's for everyone, and [Your Platform Name] is leading the
				way. Our platform opens the door to the fascinating world of coding, welcoming all skill
				levels. Whether you're an aspiring developer or just curious about coding, you'll find a
				supportive community and intuitive tools here. Join us, embrace the joy of coding, and
				discover the creator in you."
			</p>
		</div>
	</div>
</div>
