---
title: 'CSS Tips 101: CSS jots'

description: "Hey there! Let's talk about some cool new stuff in CSS. CSS is what makes websites look pretty. These new things can help you make better websites easier"

date: '2024-06-22'

lastmod: '2024-06-22'

categories:
  - CSS

  - css tips

published: true
---

# Intro;

Hey there! Let's talk about some cool stuff in CSS. CSS is what makes websites look pretty. These new things can help you make better websites easier!

## 1. Container Queries

This is like magic boxes. You can make things inside a box change when the box gets bigger or smaller. It's super helpful!

```css
.box {
	container-type: inline-size;
}

@container (min-width: 300px) {
	.thing-inside-box {
		font-size: big;
	}
}
```

## 2. Cascade Layers

Think of this like putting your clothes in different drawers. You can say which drawer is more important. It helps keep your CSS neat!

```css
@layer not-so-important, kinda-important, super-important;
```

## 3. New Selectors

CSS now has some new ways to pick things to style. Like, you can style a box if it has something special inside it:

```css
.box:has(img) {
	border: pretty;
}
```

## 4. Better Grids

You can make grid layouts easier now. Things can line up better without much work:

```css
.big-grid {
	display: grid;
}

.small-grid {
	display: grid;
	grid-template-columns: subgrid;
}
```

## 5. Smooth Scrolling

You can make pages scroll smoothly, like in phone apps:

```css
.scroll-box {
	scroll-snap-type: x mandatory;
}

.scroll-item {
	scroll-snap-align: center;
}
```

These cool CSS things help make websites look good on phones, tablets, and computers. They make it easier to create cool designs without needing to write lots of tricky code.
