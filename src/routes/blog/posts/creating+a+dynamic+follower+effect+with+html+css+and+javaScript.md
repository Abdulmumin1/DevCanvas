---
title: Creating a Dynamic Follower Effect with HTML, CSS, and JavaScript

description: "Have you ever wanted to create an interactive element that follows your mouse cursor? In this tutorial, we'll build a simple yet engaging effect using HTML, CSS, and JavaScript. We'll create a red circle that dynamically follows the mouse cursor and shrinks briefly when the window is clicked."

date: '2023-12-20'

categories:
  - CSS

  - micro interactions

  - js

published: true

thumbnail: '/devCanvas.png'
---

Have you ever wanted to create an interactive element that follows your mouse cursor? In this tutorial, we'll build a simple yet engaging effect using HTML, CSS, and JavaScript. We'll create a red circle that dynamically follows the mouse cursor and shrinks briefly when the window is clicked.

<iframe
                title="embed"
                src="https://snippet-bice.vercel.app/play/mrvliY/embed"
                frameborder="0"
                height="500px"
                width="100%"
                loading="lazy"  
/>

### Step 1: Setting up the HTML Structure

Let's start by setting up our HTML structure. Create a `div` element with a unique ID that will represent our follower:

```html
<div id="follower"></div>
```

This empty `div` with the ID "follower" will be our element to manipulate with CSS and JavaScript.

### Step 2: Styling the Follower with CSS

Next, let's style our follower using CSS to give it the appearance and behavior we desire:

```css
#follower {
	width: 50px;
	height: 50px;
	background-color: red;
	position: absolute;
	border-radius: 50%;
	transition: top 0.1s ease, left 0.1s ease, transform 0.3s ease-out;
}
```

This CSS code specifies the `width`, `height`, `background-color`, `position`, `border-radius`, and `transition` properties for the "follower" div. It creates a red circle that smoothly transitions when its position or size changes.

### Step 3: Adding Interactivity with JavaScript

Now, let's make our follower element dynamically follow the mouse cursor and perform an action when the window is clicked:

```js
const follower = document.getElementById('follower');

document.addEventListener('mousemove', (e) => {
	const x = e.clientX;
	const y = e.clientY;

	follower.style.left = x + 'px';
	follower.style.top = y + 'px';
});

window.addEventListener('click', () => {
	follower.style.transform = `scale(.1)`;

	setTimeout(() => {
		follower.style.transform = 'scale(1)';
	}, 300);
});
```

This JavaScript code does the following:

- Retrieves the `follower` element using `getElementById`.
- Listens for the `mousemove` event on the document and updates the `left` and `top` CSS properties of the follower element to match the current mouse position.
- Listens for a `click` event on the window. Upon click, it shrinks the follower to 10% of its size using `transform: scale()` and then restores its original size after a short delay using `setTimeout`.

### Final Thoughts

And there you have it! By combining HTML, CSS, and JavaScript, we've created an engaging follower effect that responds to mouse movements and clicks. Feel free to customize the styles, transitions, or additional interactions to suit your project needs.

Experiment with different properties, timings, and effects to create unique and interactive elements on your webpage!

You can view the full code and demo here.

Happy coding! 🚀✨
