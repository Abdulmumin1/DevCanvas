import { json } from '@sveltejs/kit';

import matter from 'gray-matter';

async function fetchMarkdownFilesWithFrontMatter(repositoryUrl) {
	try {
		const response = await fetch(`${repositoryUrl}/contents`);
		if (!response.ok) {
			throw new Error('Failed to fetch repository contents.');
		}
		const data = await response.json();
		const markdownFiles = data.filter((file) => file.name.endsWith('.md'));

		const filePromises = markdownFiles.map(async (file) => {
			const fileResponse = await fetch(file.download_url);
			if (!fileResponse.ok) {
				throw new Error(`Failed to fetch file: ${file.name}`);
			}
			const fileContent = await fileResponse.text();
			const frontMatter = parseFrontMatter(fileContent);
			const slug = file.name.replace('.md', '');
			return {
				fileName: file.name,
				slug: slug,
				meta: frontMatter['data'],
				content: frontMatter['content'],
				// title: frontMatter['data']['ti/tle']
				title: slug
			};
		});

		const filesWithFrontMatter = await Promise.all(filePromises);
		return filesWithFrontMatter;
	} catch (error) {
		console.error(error);
		return [];
	}
}

function parseFrontMatter(fileContent) {
	// const frontMatterRegex = /^---\s*\n([\s\S]*?)\n?---\s*\n?([\s\S]*)/;
	// const match = fileContent.match(frontMatterRegex);
	// if (match && match.length >= 3) {
	// 	const frontMatter = match[1].trim();
	// 	try {
	// 		return JSON.parse(`{${frontMatter}}`);
	// 	} catch (e) {
	// 		return `{${frontMatter}}`;
	// 	}
	// } else {
	// 	return null;
	// }
	return matter(fileContent);
}

export async function GET() {
	const repositoryUrl = 'https://api.github.com/repos/Abdulmumin1/posts';
	let files = await fetchMarkdownFilesWithFrontMatter(repositoryUrl);

	return json(files);
}
