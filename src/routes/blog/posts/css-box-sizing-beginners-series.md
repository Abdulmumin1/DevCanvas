---
title: 'CSS Box Sizing: Beginners Series'

description: 'the box-sizing property profoundly influences the behavior of the CSS Box Model, impacting how elements are sized and how their dimensions are calculated. Understanding and utilizing box-sizing effectively can lead to more predictable and manageable layouts in web development projects.'

date: '2024-04-14'

lastmod: '2024-04-14'

categories:
  - CSS

  - box sizing

published: true

thumbnail: '/devCanvas.png'
---

# Introduction;

Box Model governs how elements are sized and spaced on a webpage. The `**box-sizing**` property allows developers to control how these dimensions are calculated, simplifying layout design.

In this guide, we'll explore two key values of `**box-sizing**`: `**content-box**` and `**border-box**`. By grasping these concepts, you'll gain the skills to create consistent and responsive layouts for your web projects. Let's dive right into CSS Box Sizing!

## content-box;

This is the default value of the `box-sizing` property. When `box-sizing: content-box;` is applied, the width and height properties only include the content area of the element, excluding any padding, border, or margin. In other words, the specified width and height represent the dimensions of the content box alone, without accounting for any additional spacing or borders.

![Content Box Model content-box - devcanvas.art](https://paper-attachments.dropboxusercontent.com/s_D3BD2DAB039892F3E42800E996C475752FB5F6450CB601801DF350472513A370_1712443648448_2.png)

```css
.box {
	box-sizing: content-box;
	width: 300px; /* Content width only */
	height: 200px; /* Content height only */
	padding: 20px;
	border-width: 2px;
	margin: 10px;
}
```

With `box-sizing: content-box;`, the total width and height of the element would be calculated as follows:

Total width = content width + padding + border
Total height = content height + padding + border

## border-box;

When `box-sizing: border-box;` is applied, the width and height properties include both the content area and any padding and border assigned to the element. In this mode, the specified width and height represent the entire box model, from the outer edge of the border to the outer edge of the border on the opposite side.

![Border Box  Model border-box - devcanvas.art](https://paper-attachments.dropboxusercontent.com/s_D3BD2DAB039892F3E42800E996C475752FB5F6450CB601801DF350472513A370_1712443670660_1.png)

```css
.box {
	box-sizing: border-box;
	width: 300px; /* Total width including padding and border */
	height: 200px; /* Total height including padding and border */
	padding: 20px;
	border-width: 2px;
	margin: 10px;
}
```

With `box-sizing: border-box;`, the total width and height of the element would be calculated as follows:

Total width = content width (including padding and border)
Total height = content height (including padding and border)

## Effects of `box-sizing`:

- **Simplified Sizing**: With `box-sizing: border-box;`, it's easier to specify the overall size of an element, as you don't have to account for padding and border separately.
- **Predictable Layouts**: By using `border-box`, you can ensure that the size of an element remains consistent regardless of changes to padding or border widths.
- **Improved Responsiveness**: `border-box` can be particularly useful in responsive design, as it allows elements to resize more intuitively when adapting to different screen sizes.

In summary, the `box-sizing` property profoundly influences the behavior of the CSS Box Model, impacting how elements are sized and how their dimensions are calculated. Understanding and utilizing `box-sizing` effectively can lead to more predictable and manageable layouts in web development projects.
