import { redirect } from '@sveltejs/kit';

import JSZip from 'jszip';

async function zipEverything() {
	const textsToZip = [
		'This is text 1.',
		'Another text for file 2.',
		'Some more content for file 3.'
	];

	const zip = new JSZip();

	textsToZip.forEach((text, index) => {
		zip.file(`file_${index + 1}.txt`, text);
	});

	const content = await zip.generateAsync({ type: 'blob' });
	return content;
}

/** @type {import('./$types').Actions} */
export const actions = {
	search: async ({ request }) => {
		let body = Object.fromEntries(await request.formData());
		throw redirect(303, `/search?query=${body.query}`);
	}
};
