---
title: "Creating a Stylish Button with Unique Hover Effect - Beginner's Tutorial"

description: 'In this tutorial, we will guide you through the process of crafting a sophisticated button with a captivating hover effect using HTML and SCSS. This button not only enhances the visual appeal of your website but also introduces an engaging animation when users interact with it.'

date: '2024-02-3'

lastmod: '2024-02-06'

categories:
  - CSS

  - button

  - svg

  - animation

published: true

thumbnail: '/devCanvas.png'
---

In this tutorial, we will guide you through the process of crafting a sophisticated button with a captivating hover effect using HTML and SCSS. This button not only enhances the visual appeal of your website but also introduces an engaging animation when users interact with it.

## Prerequisites:

- Basic knowledge of HTML
- Fundamental understanding of SCSS (Sass)

## Step 1: Setting Up the HTML Structure

```html
<a class="button" href="https://devcanvas.art/blog" title="DevCanvas Blog" target="_blank">
	<svg height="60" width="300" xmlns="http://www.w3.org/2000/svg">
		<rect class="shape" height="60" width="300" />
		<text class="text" text-anchor="middle" dominant-baseline="middle" x="50%" y="50%">
			Learn More
		</text>
	</svg>
</a>
```

In this step, we employ an anchor (`<a>`) element containing an SVG with a rectangle (`<rect>`) representing the button and text (`<text>`) conveying the button label.

## Step 2: Crafting Styles with SCSS

```scss
$bg: #171717;
$text-color: #fff;
$accent: cyan;

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

body {
	font-family: 'Mulish', sans-serif;
	background: $bg;
	display: flex;
	height: 100vh;
	align-items: center;

	.button {
		display: inline-block;
		max-width: 20rem;
		margin: 0 auto;
		text-align: center;
		text-transform: uppercase;
		text-decoration: none;
		position: relative;

		.shape {
			fill: transparent;
			stroke: $accent;
			stroke-dasharray: 120 500;
			stroke-dashoffset: -454;
			stroke-width: 8px;
			transition:
				stroke-width 0.9s,
				stroke-dashoffset 0.9s,
				stroke-dasharray 0.9s;
		}

		.text {
			font-size: 1.4rem;
			line-height: 2rem;
			letter-spacing: 0.3rem;
			fill: $text-color;
			top: -3rem;
			position: relative;
			pointer-events: none;
			height: 100000px;
		}

		.shape:hover {
			stroke-width: 3px;
			stroke-dashoffset: 0;
			stroke-dasharray: 760;
		}
	}
}
```

### Breakdown:

#### 1. **Variable Declarations:**

```scss
$bg: #171717;
$text-color: #fff;
$accent: cyan;
```

These variables define the background color (`$bg`), text color (`$text-color`), and accent color (`$accent`).

#### 2. **Universal Reset:**

```scss
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
```

This section uses the universal selector (`*`) to reset margin, padding, and box-sizing for all elements.

#### 3. **Body Styling:**

```scss
body {
	font-family: 'Mulish', sans-serif;
	background: $bg;
	display: flex;
	height: 100vh;
	align-items: center;
}
```

These styles set the font family, background color, and display properties for the body.

#### 4. **Button Styling:**

```scss
.button {
	display: inline-block;
	max-width: 20rem;
	margin: 0 auto;
	text-align: center;
	text-transform: uppercase;
	text-decoration: none;
	position: relative;
}
```

This section defines styles for the button, including display, maximum width, centering, and relative positioning.

#### 5. **Shape Styling:**

```scss
.shape {
	fill: transparent;
	stroke: $accent;
	stroke-dasharray: 120 500;
	stroke-dashoffset: -454;
	stroke-width: 8px;
	transition:
		stroke-width 0.9s,
		stroke-dashoffset 0.9s,
		stroke-dasharray 0.9s;
}
```

These styles are applied to the rectangular shape of the button, creating a stroke with a dash array and offset for an initial animation.

#### 6. **Text Styling:**

```scss
.text {
	font-size: 1.4rem;
	line-height: 2rem;
	letter-spacing: 0.3rem;
	fill: $text-color;
	top: -3rem;
	position: relative;
	pointer-events: none;
	height: 100000px;
}
```

This section styles the text within the button, adjusting size, line height, and letter spacing. The text is positioned above the button and made transparent to avoid hover interactions.

#### 7. **Hover Effect:**

```scss
.shape:hover {
	stroke-width: 3px;
	stroke-dashoffset: 0;
	stroke-dasharray: 760;
}
```

The hover effect is defined here, reducing stroke width and revealing the entire dash array upon hovering over the button shape.

## Step 3: Customization and Experimentation

Feel free to experiment with the provided variables (`$bg`, `$text-color`, `$accent`) and other values to customize the button to align with your specific design preferences.

## Conclusion

Congratulations! You've successfully created a visually appealing button with a unique hover effect using HTML and SCSS. This button adds a touch of interactivity to your website, enhancing the overall user experience. Don't hesitate to explore various styles, colors, and sizes to make it uniquely yours!
