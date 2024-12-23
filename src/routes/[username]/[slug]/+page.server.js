import { error, redirect } from '@sveltejs/kit';
// import { current_data } from '$lib/index.js';
import { compile } from 'mdsvex';
import { codeToHtml } from 'shiki';

let options = {
	highlight: {
		highlighter: async (code, lang = 'text') => {
			// const highlighter = await shiki.getHighlighter({
			// 	theme: 'github-dark'
			// });
			const html = await codeToHtml(code, {
				lang,
				themes: { dark: 'andromeeda', light: 'catppuccin-latte' }
			});
			return `{@html \`${html}\`}`;
		}
	}
}
export async function load({ url, params, locals:{supabase} }) {
	let slug = params['slug'];
	// console.log(slug);
	let { data, error: err } = await supabase.from('snips').select('*, profiles (username)').eq('project_key', slug);
	if (err) throw err;

	if (data.length <= 0) {
		// console.error(error);
		// console.log('erejrejlreo rea fljsa fdoaf dsaf ');
		throw error(404, 'Enhance your calm');
	}

	// let { data: username, error: er } = await supabase
	// 	.from('profiles')
	// 	.select('username')
	// 	.eq('user_id', data[0].user_id);

	// if (er) throw er;
	// console.log(username, data[0].user_id);
	
		// let fullurl = `${url.origin}/xi1w/${slug}`;
		let fullurl = `${url.origin}/${data[0].profiles.username}/${slug}`;
		if (url.origin + url.pathname != fullurl) {
			console.log('invalide url');
			throw redirect(307, `/${data[0].profiles.username}/${slug}`);
		} else {
			console.log('valide url');
		}
	

	 let rendered = await compile(data[0].markdown, options)
	
    
	data[0]['markdown']  = rendered.code.replace(/{@html `<pre/g, '<pre')
	.replace(/<\/code><\/pre>`}/g, '</code></pre>');

	return { ...data, isFound: data.length > 0 };
}
