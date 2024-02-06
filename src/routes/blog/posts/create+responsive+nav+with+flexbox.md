---
title: Creating Responsive Navigation Bar using CSS Flexbox

description: 'CSS Flexbox is a layout model that helps in creating flexible and responsive layouts. It allows elements within a container to be dynamically arranged based on available space, making it perfect for designing navigation bars.'

date: '2023-12-11'

lastmod: '2024-02-05'

categories:
  - CSS

  - flexbox

  - csslayout

  - Frontend

published: true

thumbnail: '/devCanvas.png'
---

In this tutorial, we’ll dive into creating a responsive navigation bar using CSS Flexbox. Navigation bars are essential for websites, and making them responsive ensures a seamless user experience across devices.

### Understanding CSS Flexbox

CSS Flexbox is a powerful layout model that facilitates the creation of flexible and responsive designs. It allows elements within a container to dynamically adjust based on available space, making it an ideal choice for crafting navigation bars that adapt effortlessly to varying screen sizes.

### HTML Structure

Let's begin by setting up the HTML structure for our navigation bar. Open your HTML file and add the following code:

```html
<!DOCTYPE html>
<html>
	<head>
		<title>Responsive Navigation Bar</title>
		<link rel="stylesheet" type="text/css" href="styles.css" />
	</head>
	<body>
		<nav class="navbar">
			<div class="logo"><a href="#">Logo</a></div>
			<ul class="nav-links">
				<li><a href="#">Home</a></li>
				<li><a href="#">About</a></li>
				<li><a href="#">Services</a></li>
				<li><a href="#">Contact</a></li>
			</ul>
		</nav>
	</body>
</html>
```

Here, we've created a basic structure consisting of a `<nav>` element containing a logo (`<div class="logo">`) and a list of navigation links (`<ul class="nav-links">`).

### Styling with CSS

Now, let's add styles to our navigation bar using CSS Flexbox to ensure responsiveness.

#### Resetting Default Styles

First, let's reset default styles:

```css
body,
ul {
	margin: 0;
	padding: 0;
	list-style: none;
}
```

This eliminates default margins, paddings, and list styles for a clean layout.

#### Styling the Navbar

Next, style the `.navbar`:

```css
.navbar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #333;
	padding: 15px 20px;
}
```

- `justify-content: space-between;` evenly spaces the elements along the main axis.
- `align-items: center;` vertically centers items within the container.
- Other properties define the background color and padding for the navbar.

#### Logo and Navigation Links

Style the logo and navigation links:

```css
.logo a {
	color: #fff;
	text-decoration: none;
	font-weight: bold;
	font-size: 24px;
}

.nav-links {
	display: flex;
}

.nav-links li {
	margin-right: 20px;
}

.nav-links li a {
	color: #fff;
	text-decoration: none;
	font-weight: bold;
}
```

- `.logo a` styles the link inside the logo division.
- `.nav-links` sets the navigation links as a Flexbox container.
- `.nav-links li` and `.nav-links li a` style the list items and their anchor (link) elements.

#### Responsive Design (Media Query)

Lastly, ensure responsiveness using a media query:

```css
@media screen and (max-width: 768px) {
	.navbar {
		flex-direction: column;
		align-items: flex-start;
	}

	.nav-links {
		flex-direction: column;
		margin-top: 20px;
	}

	.nav-links li {
		margin-right: 0;
		margin-bottom: 10px;
	}
}
```

Explanation:

- When the screen width is 768px or less, the Flexbox layout changes to a column layout for better display on smaller screens.

### Conclusion

With CSS Flexbox, creating a responsive navigation bar becomes efficient and straightforward. Flexbox's flexibility enables us to craft layouts that seamlessly adapt to different screen sizes, significantly enhancing user experience. Don't hesitate to further customize and explore additional Flexbox properties to enhance your navigation bar. Happy coding!

<iframe
  title="embed"
  src="https://snippet-bice.vercel.app/play/hm4MW1/embed"
  frameborder="0"
  height="500px"
  width="100%"
  loading="lazy"  
/>
