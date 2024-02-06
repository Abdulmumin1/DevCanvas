import { html as toReactNode } from 'satori-html';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import Card from '$lib/og/card.svelte';
import VisbyRoundCF from '$lib/font/Rubik-Medium.ttf';
// import { read } from '$app/server';

const height = 630;
const width = 1200;

// const font_data = await read(Font).arrayBuffer();

/** @type {Record<string, ArrayBuffer>} */
const fontMemo = {};

/**
 * @param {string} path
 * @returns {Promise<ArrayBuffer>}
 */

async function getFont(path) {
	if (fontMemo[path]) return fontMemo[path];
	const result = await fetch(path).then((r) => r.arrayBuffer());
	fontMemo[path] = result;
	return result;
}

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	const message = url.searchParams.get('message') ?? undefined;

	const result = Card.render({ message });
	const element = toReactNode(`${result.html}<style>${result.css.code}</style>`);
	const fontData = await getFont(`${url.origin}${VisbyRoundCF}`);

	const svg = await satori(element, {
		fonts: [
			{
				name: 'Visby',
				data: fontData,
				style: 'normal'
			}
		],
		height,
		width
	});

	const resvg = new Resvg(svg, {
		fitTo: {
			mode: 'width',
			value: width
		}
	});

	const image = resvg.render();

	return new Response(image.asPng(), {
		headers: {
			'content-type': 'image/png'
		}
	});

	// return new Response();
}
