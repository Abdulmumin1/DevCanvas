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

This article explores recent advancements in CSS that enhance web development efficiency and design capabilities. These features offer powerful tools for creating responsive, well-structured, and greatly improving developer experience.

## 1. Container Queries

Container queries allow for responsive design at the component level, enabling elements to adapt based on their parent container's size rather than just the viewport.

```css
.container {
	container-type: inline-size;
}

@container (min-width: 300px) {
	.container-child {
		font-size: 1.2rem;
	}
}
```

## 2. Cascade Layers

Cascade layers introduce a new way to manage the cascade and specificity in CSS, allowing developers to group and prioritize styles more effectively.
How Cascade Layers Work:

- Layers are defined using the @layer rule.
- Styles within a layer are isolated from styles in other layers.
- Layers are prioritized in the order they're declared, with later layers having higher priority.
- Styles outside of any layer have the highest priority.

Example:

```css
@layer base, components, utilities;

@layer base {
	h1 {
		font-size: 2rem;
	}
}

@layer components {
	.header h1 {
		font-size: 2.5rem;
	}
}

@layer utilities {
	.text-large {
		font-size: 3rem;
	}
}
```

we can change the order to affect the specificity of the styles;

```css
@layer base, utilities, components;
```

## 3. Advanced Selectors

New selectors like `:has()` expand styling possibilities, allowing for more complex and precise element targeting.

```css
.parent:has(> img) {
	border: 1px solid #ccc;
}
```

## 4. Subgrid

Subgrid enhances CSS Grid by allowing nested grids to inherit track sizes from their parents, facilitating more coherent layouts.

```css
.parent-grid {
	display: grid;
}

.child-grid {
	display: grid;
	grid-template-columns: subgrid;
}
```

## 5. Scroll Snap

Scroll snap improves user experience by providing smooth, controlled scrolling behavior, particularly useful for carousels and slideshows.

```css
.scroll-container {
	scroll-snap-type: x mandatory;
}

.scroll-item {
	scroll-snap-align: center;
}
```

These CSS features significantly enhance our ability to create responsive, well-structured, and interactive designs across various devices and screen sizes, while reducing the complexity of implementation.
