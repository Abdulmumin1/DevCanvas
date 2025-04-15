<script>
	import Footer from '$components/footer.svelte';
	import InnerNav from '$components/innerNav.svelte';

	import Hero from '$components/landing/hero.svelte';
	import LanguageSupport from '$components/landing/languageSupport.svelte';
	import FeaturesSect from '$components/landing/featuresSect.svelte';
	import EmbedSection from '$components/landing/embedSection.svelte';

	import { SnippetsDescription } from '$lib/index.js';
	import TestimonialsGrid from '../components/landing/testimonialsGrid.svelte';
	import AiLanding from '../components/landing/aiLanding.svelte';
	import BackgroundGrid from '../components/landing/backgroundGrid.svelte';
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

	<meta name="twitter:image" content="/devcanvas.png" />
	<meta name="og:image" content="/devcanvas.png" />
</svelte:head>

<div
	class="before:he bg-skyblue-500 relative flex h-screen w-screen flex-col items-center "
>


<div class="relative w-full">
	<InnerNav />
</div>
	<!-- <div class="relative z-10 w-full">
	</div>
	<div class="mx-auto flex w-full flex-col items-center justify-center gap-4 overflow-y-hidden">
		<div class="grid max-h-[40rem] overflow-y-hidden md:max-h-[35rem] lg:max-h-[50rem]">
			<header class="w-full overflow-y-hidden">
				<div class="mt-20 overflow-y-hidden">
					<Hero />
				</div>
			</header>
		</div>
		<main class="w-full">
			<FeaturesSect />
			<LanguageSupport />
			<EmbedSection />
			
		</main>
	</div> -->

	

	<div class="mt-44 relative">
		<AiLanding/>
	</div>
	<BackgroundGrid/>
</div>
<!-- <Footer /> -->
