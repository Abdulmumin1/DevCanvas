export function generateStructuredData({
	title,
	author = 'Abdulmumin Yaqeen',
	authorUrl = 'https://yaqeen.me/about',
	datePublished,
	description,
	url
} = {}) {
	let scriptT = document.createElement('script');
	scriptT.type = 'application/ld+json';
	let content = `
	
	{
	  "@context": "https://schema.org",
	  "@type": "BlogPosting",
	  "mainEntityOfPage": {
		"@type": "WebPage",
		"@id": "${url}"
	  },
	  "headline": "${title}",
	  "description": "${description}",
	  "image": "https://devcanvas.art/og?message=${encodeURIComponent(description)}",  
	  "author": {
		"@type": "Organization",
		"name": "${author}",
		"url": "${authorUrl}"
	  },  
	  "publisher": {
		"@type": "Organization",
		"name": "DevCanvas",
		"logo": {
		  "@type": "ImageObject",
		  "url": "https://devcanvas.art/logo.svg"
		}
	  },
	  "datePublished": "${datePublished}",
	  "dateModified": "${datePublished}"
	}
            `;

	scriptT.textContent = content;
	return scriptT;
}
