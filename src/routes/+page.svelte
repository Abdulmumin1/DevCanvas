<script>
	import Footer from '$components/footer.svelte';
	import InnerNav from '$components/innerNav.svelte';

	import Hero from '$components/landing/hero.svelte';
	import Discover from '$components/landing/discover.svelte';
	import LanguageSupport from '$components/landing/languageSupport.svelte';
	import CodeEditor from '$components/landing/codeEditor.svelte';
	import FeaturesSect from '$components/landing/featuresSect.svelte';
	import Faq from '$components/landing/faq.svelte';
	import EmbedSection from '$components/landing/embedSection.svelte';
	import Forcreators from '$components/landing/forcreators.svelte';
	import Forcreatives from '$components/landing/forcreatives.svelte';
	import Explore from '$components/landing/explore.svelte';

	import { SnippetsDescription } from '$lib/index.js';
</script>

<svelte:head>
	<!-- HTML Meta Tags -->
	<title>{$SnippetsDescription.name}</title>

	<!-- Facebook Meta Tags -->
	<meta property="og:title" content="DevCanvas" />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:title" content="DevCanvas" />

	<meta name="robots" content="index, follow" />

	<script type="application/ld+json">
		{
			"@context": "https://schema.org/",
			"@type": "WebSite",
			"name": "devCanvas",
			"url": "https://devcanvas.art",
			"potentialAction": {
				"@type": "SearchAction",
				"target": "https://devcanvas.art/search?query={search_term_string}",
				"query-input": "required name=search_term_string"
			}
		}
	</script>

	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Organization",
			"name": "DevCanvas",
			"alternateName": "snippetland",
			"url": "https://devcanvas.art",
			"logo": "https://devcanvas.art/logo.png",
			"sameAs": "https://twitter.com/@devcanvas_"
		}
	</script>
</svelte:head>

<div
	class="before:he bg-skyblue-500 relative flex min-h-screen w-screen flex-col items-center justify-center"
>
	<div class="relative z-10 w-full">
		<InnerNav />
	</div>
	<div class="mx-auto flex w-full flex-col items-center justify-center gap-4 overflow-y-hidden">
		<!-- Add your landing page content here -->
		<div class="grid max-h-[40rem] overflow-y-hidden md:max-h-[35rem] lg:max-h-[50rem]">
			<header class="w-full overflow-y-hidden">
				<!-- <div
					id="kds"
					class=" w-screen right-0 h-[612px] bg-sky-300 top-0 overflow-hidden absolute"
				/> -->
				<div class="mt-20 overflow-y-hidden">
					<Hero />
				</div>
			</header>
		</div>
		<main class="w-full">
			<!-- Add your features or benefits here -->
			<!-- <Explore /> -->
			<FeaturesSect />

			<!-- <Discover /> -->
			<LanguageSupport />
			<EmbedSection />
			<!-- Add code editor section -->
			<!-- <CodeEditor /> -->
			<!-- The Idea-->
			<!-- <Idea /> -->
			<!-- The Idea-->
			<!-- <Faq /> -->
		</main>
	</div>
</div>
<Footer />
