import { JSDOM } from 'jsdom';
import got from 'got';
import { html as toReactNode } from 'satori-html';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import Card from '$lib/og/card.svelte';
import VisbyRoundCF from '$lib/font/Rubik-Medium.ttf';


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

/**
 * @type {import('./$types').RequestHandler}
 */
export async function GET({ url: URL, params }) {
    try {
        const {
            url = `${URL.origin}/output/compile/${params.slug}`,
            width = 1280,
            height = 1280,
            format = 'svg', // Enforce SVG format since no rasterization is done
        } = { ...Object.fromEntries(URL.searchParams) };

        // Validate URL
        if (!url || !url.startsWith('http')) {
            return new Response('Invalid URL', { status: 400 });
        }

        // Fetch the page content
        const response = await got(url);
        const html = response.body;

        // Parse the HTML
        // const dom = new JSDOM(html);

        // Extract the rendered content
        // const renderedContent = dom.window.document.body.innerHTML;

        // Convert to an SVG using Satori
        const svg = await renderToSVG(html, width, height, URL);

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
        
    } catch (error) {
        console.error('Error taking screenshot:', error);
        return new Response('Failed to process request', { status: 500 });
    }
}

/**
 * Render HTML content to SVG
 * Uses Satori to generate an SVG representation of the content.
 * @param {string} content - HTML content to render
 * @param {number} width - SVG width
 * @param {number} height - SVG height
 * @returns {Promise<string>} - The rendered SVG as a string
 */
async function renderToSVG(content, width, height, url) {
    try {
        // console.log(content)
	const element = toReactNode(content);
    console.log(element.props.children.props.children)
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

        return svg
    } catch (error) {
        console.error('Error generating SVG:', error);
        throw error;
    }
}
