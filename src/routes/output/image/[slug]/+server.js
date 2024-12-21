import puppeteer from 'puppeteer';

/** @type {import('./$types').RequestHandler} */
export async function GET({url:URL,  params, request }) {
    try {
        // console.log(Object.fromEntries(URL.searchParams))
        const { url = `${URL.origin}/output/compile/${params.slug}`, width = 1280, height = 1280, format = 'png' } = {...Object.fromEntries(URL.searchParams)};

        // Validate URL
        if (!url || !url.startsWith('http')) {
            return new Response('Invalid URL', { status: 400 });
        }

        // Launch Puppeteer
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Set viewport dimensions
        if (width && height) {
            await page.setViewport({ width: Number(width), height: Number(height) });
        }

        // Navigate to the URL
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Capture the screenshot
        const screenshot = await page.screenshot({ type: format });

        // Close the browser
        await browser.close();

        // Return the screenshot as a response
        return new Response(screenshot, {
            headers: {
                'Content-Type': `image/${format}`,
                'Content-Disposition': `inline; filename="screenshot.${format}"`,
            },
        });
    } catch (error) {
        console.error('Error taking screenshot:', error);
        return new Response('Failed to take screenshot', { status: 500 });
    }
}
