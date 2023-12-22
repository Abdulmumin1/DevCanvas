export function generateStructuredData({
	title,
	author = 'Abdulmumin Yaqeen',
	authorUrl = 'yaqeen.me/about',
	authorImage = 'https://www.yaqeen.me/_app/immutable/assets/abdul.66936237.jpg',
	datePublished,
	description,
	keywords = []
} = {}) {
	let scriptT = document.createElement('script');
	scriptT.type = 'application/ld+json';
	let content = `
		{
			"@context": "https://schema.org/",
			"@type": "BlogPosting",
			"mainEntityOfPage": "https://dataliberate.com/2019/05/14/library-metadata-evolution-final-mile/",
			"headline": "${title}",
			"name": "${title}",
			"description": "${description}",
			"datePublished": "${datePublished}",
			"dateModified": "${datePublished},"
			"author": {
				"@type": "Person",
				"name": "${author}",
				"url": "${authorUrl}",
				"image": {
					"@type": "ImageObject",
					"url": "${authorImage}",
					"height": "96",
					"width": "96"
				}
			},
			"publisher": {
				"@type": "Organization",
				"@id": "https://devCanvas.art",
				"name": "Dev Canvas",
				"logo": {
					"@type": "ImageObject",
					"@id": "https://snippet-bice.vercel.app/logo.png",
					"url": "https://snippet-bice.vercel.app/logo.png",
					"width": "200",
					"height": "200"
				}
			},
			
			"url": "https://dataliberate.com/2019/05/14/library-metadata-evolution-final-mile/",
			"isPartOf": {
				"@type" : "Blog",
				 "@id": "https://devCanvas.art/blog/",
				 "name": "Dev Canvas Blog",
				 "publisher": {
					 "@type": "Organization",
					 "@id": "https://devCanvas.art",
					 "name": "Dev Canvs"
				 }
			 },
             
            }
            `;
	// "keywords":${[
	//     'html',
	//     'css',
	//     'animations',
	//     'frontend',
	//     'react',
	//     'svelte',
	//     'scss',
	//     'nuxt.js',
	//     'next.js',
	//     'solid',
	//     'angular',
	//     'sveltekit',
	//     'astro',
	//     'django',
	//     'webdev',
	//     ...keywords
	// ]},
	// "image": {
	// 	"@type": "ImageObject",
	// 	"@id": "https://dataliberate.com/wp-content/uploads/2019/05/Metadata_Evolution_the_Final_Mile.jpg",
	// 	"url": "https://dataliberate.com/wp-content/uploads/2019/05/Metadata_Evolution_the_Final_Mile.jpg",
	// 	"height": "362",
	// 	"width": "388"
	// },

	scriptT.textContent = content;
	return scriptT;
}
