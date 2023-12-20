---
title: Creating a Mac OS Dock Animated with HTML and CSS

description: "In this tutorial, we'll recreate a similar animated dock using HTML and CSS. This dock will feature icons that expand and elevate when hovered over, just like the Mac OS dock."

date: '2023-12-20'

categories:
  - CSS

  - macos

  - js

published: true

thumbnail: '/devCanvas.png'
---

Have you ever admired the sleek and interactive Mac OS dock? In this tutorial, we'll recreate a similar animated dock using HTML and CSS. This dock will feature icons that expand and elevate when hovered over, just like the Mac OS dock.

<iframe
                title="embed"
                src="https://snippet-bice.vercel.app/play/eKCyam/embed"
                frameborder="0"
                height="500px"
                width="100%"
                loading="lazy"  
/>

### Setting up the HTML Structure

Let's start by creating the HTML structure for our animated dock:

```html
<div class="dock">
	<ul class="dock-list">
		<li>
			<img
				src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853981255cc36b3a37af_finder.png"
				alt="Finder"
			/>
		</li>
		<li>
			<img
				src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853ddd826358438eda6d_safari.png"
				alt="Safari"
			/>
		</li>
		<li>
			<img
				src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5fedaca72d254225f4231a31_45_facetime.png"
				alt="Facetime"
			/>
		</li>
		<li>
			<img
				src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853270b5e2ccfd795b49_appstore.png"
				alt="App Store"
			/>
		</li>
		<li>
			<img
				src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f708535849ec3b2e752cef3_calendar.png"
				alt="Calender"
			/>
		</li>
		<li>
			<img
				src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853943597517f128b9b4_launchpad.png"
				alt="Drawer"
			/>
		</li>
	</ul>
</div>
```

Replace the image URLs with your preferred icons. Ensure they are appropriately sized and have transparent backgrounds for a cleaner look.

### Styling the Dock with CSS

Now, let's style our dock and its icons using CSS to achieve the Mac OS-like appearance and animations:

### CSS

```css
body {
	background-color: white;
}
```

#### Dock Container Styles

```css
.dock {
	position: fixed;
	bottom: 0;
	left: 50%;
	height: 75px;
	background: #f0f0f0;
	backdrop-filter: blur(10px);
	z-index: 999;
	width: fit-content;
	transform: translateX(-50%);
	padding: 0 20px;
	border-radius: 30px;
	margin-bottom: 20px;
}
```

- `position: fixed;` fixes the dock at the bottom of the viewport, ensuring it remains visible even when the user scrolls.
- `bottom: 0;` places the dock at the bottom of the screen.
- `left: 50%;` positions the dock horizontally at 50% of the viewport width.
- `height: 75px;` sets the height of the dock.
- `background: #f0f0f0;` provides a light gray background color for the dock.
- `backdrop-filter: blur(10px);` applies a blur effect to the background, enhancing the visual appeal.
- `z-index: 999;` ensures the dock appears above other elements on the page.
- `width: fit-content;` makes the width of the dock adjust to fit its content.
- `transform: translateX(-50%);` horizontally centers the dock using a CSS transform.
- `padding: 0 20px;` adds padding to the left and right sides of the dock.
- `border-radius: 30px;` rounds the corners of the dock.
- `margin-bottom: 20px;` adds some space below the dock for better spacing between content.

#### Dock List Styles

```css
.dock-list {
	list-style: none;
	padding: 0;
	margin: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
}
```

- `list-style: none;` removes default list styles (bullets or numbers) from the `<ul>` element.
- `padding: 0; margin: 0;` removes default padding and margin of the `<ul>` element.
- `display: flex;` changes the layout to a flexbox, allowing for easy alignment and positioning.
- `justify-content: center; align-items: center;` horizontally and vertically centers the items within the dock.
- `height: 100%;` ensures the `<ul>` element takes up the full height of its container (the `.dock` div).

### Dock Item (Icon) Styles

```css
.dock-list li {
	margin: 0 1px;
	transition: transform 0.3s ease-in-out;
}

.dock-list li img {
	width: 50px;
	height: 50px;
	border-radius: 20%;
	box-shadow: 0 0px 0px rgba(0, 0, 0, 0.2);
}
```

- `.dock-list li` applies margin between individual icons and specifies the transition effect when an icon is hovered over (`transform` with a duration of 0.3s and ease-in-out timing function).
- `.dock-list li img` styles the images within the list items, setting their width and height to 50px x 50px, applying a rounded border, and adding a subtle box shadow for a 3D effect.

#### Hover Effect

```css
.dock-list li:hover {
	transform: translateY(-10px);
	scale: 1.5;
	margin: 0 10px;
}
```

- When an icon (`li`) is hovered over, it translates upward (`transform: translateY(-10px);`), scales to 1.5 times its original size (`scale: 1.5;`), and increases the margin for spacing (`margin: 0 10px;`). This creates an animated expansion and elevation effect for the icons.

### Adding More Icons (Optional)

Feel free to add more icons to the dock by inserting additional `<li>` elements with their respective image sources.

### Customization and Experimentation

Experiment with different icon sizes, shadow effects, or transition timings to customize the appearance and behavior of your dock. You can also explore adding functionalities to these icons with JavaScript to create a more interactive experience.

### Conclusion

And there you have it! With a bit of HTML and CSS, you've created an animated dock reminiscent of the Mac OS style. Feel free to personalize it further, add your favorite app icons, or enhance its interactivity as per your preferences.

Explore and have fun with your personalized Mac OS-like dock on your web projects!
