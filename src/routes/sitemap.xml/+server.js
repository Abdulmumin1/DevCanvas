import { error } from '@sveltejs/kit';

export async function GET({ fetch, url, locals: { supabase } }) {
	const response = await fetch('blog/api/posts');
	const posts = await response.json();
	let { data: keys, error: err } = await supabase
		.from('htmlPlayground')
		.select('project_key')
		.order('created_at', { ascending: false })
		.is('public', true);

	let { data: snips, error: errSnipps } = await supabase
		.from('snips')
		.select('project_key, profiles (username)')
		.order('created_at', { ascending: false });

	// console.log(keys, snips);
  
	const xml = `
    <?xml version="1.0" encoding="UTF-8" ?>
    <urlset
        xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="https://www.w3.org/1999/xhtml"
        xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
    >
    <url>
    <loc>https://devcanvas.art</loc>
  </url>
    <url>
    <loc>https://devcanvas.art/explore</loc>
    <lastmod>2024-01-17</lastmod>
  </url>
   <url>
    <loc>https://devcanvas.art/play</loc>
  </url>
  <url>
    <loc>https://devcanvas.art/blog</loc>
  </url>
  <url>
    <loc>https://devcanvas.art/play/try</loc>
  </url>
  <url>
    <loc>https://devcanvas.art/signin</loc>
  </url>
   <url>
    <loc>https://devcanvas.art/about</loc>
  </url>
   <url>
    <loc>https://devcanvas.art/privacy-policy</loc>
  </url>
   <url>
    <loc>https://devcanvas.art/terms-of-service</loc>
  </url>
 
    ${posts
			.map(
				(post) => `
            <url>
                <loc>${url.origin}/blog/${post.slug}</loc> 
            </url>
        `
			)
			.join('')}

    
      ${Object.values(keys)
				.map(
					(index) => `
              <url>
                 
                  <loc>${url.origin}/play/${index['project_key']}</loc>
              </url>
          `
				)
				.join('')}
  
        ${Object.values(snips)
					.map(
						(index) => `
              <url>
                 
                  <loc>${url.origin}/${index.profiles.username}/${index['project_key']}</loc>
              </url>
          `
					)
					.join('')}
  
    </urlset>`.trim();
	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
}
