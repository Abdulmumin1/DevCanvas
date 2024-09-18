---
title: 'How to Embed your DevCanvas Projects to websites'

description: 'CSS combinators are tools that allows you to create more efficient and maintainable stylesheets. With combinators, you can often ditch a bunch of extra classes and IDs in your HTML.'

date: '2024-09-01'

lastmod: '2024-09-01'

categories:
  - how to

published: true
---

DevCanvas is a powerful online platform for web developers, similar to CodePen, that allows you to create, edit, and share your web projects. One of the cool features of DevCanvas just like Codepen is the ability to embed your projects in other websites.

Here's how to do it:

1. **Get the Embed Code**:

- Open your saved project in DevCanvas.
- Look for an "Embed" option, which should provide you with an `iframe` code.
- Or just and `/embed` to the end of your project URL.

2. **Copy the Embed Code**:

- The embed `URL` will look similar to this:

`https://devcanvas.art/play/v4H9dW/embed`

3. **Customize the Embed (Optional)**:

- You can modify the iframe attributes to control its appearance:
- Add `width` and `height` attributes to set the size.
- Use the `active` parameter to specify which editor should be active by default (html, css, or js).

4. **Paste the Code**:

- In your website's HTML, paste the iframe code where you want the DevCanvas project to appear.

5. **Example of Embed full code**:

<iframe 
  src="https://devcanvas.art/play/D0YhpV/embed?active=css"
  width="100%" 
  height="700" 
  frameborder="0"
  class="rounded-xl"
  allowfullscreen
></iframe>
