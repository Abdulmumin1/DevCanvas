---
title: 'BEM (Block Element Modifier): CSS naming convention'

description: "BEM stands for Block, Element, Modifier. It's a naming convention that makes CSS classes more meaningful and easier to understand. The main goal is to create clear, strict relationships between HTML and CSS."

date: '2024-06-23'

lastmod: '2024-06-23'

categories:
  - CSS

  - css tips

published: false
---

# BEM (Block Element Modifier) : CSS naming convention

Personally, I have moved to untility classes (particularly tailwindcss), but there are lots of companies that requires you to manage the cumbersome vanilla CSS or maybe vanilla CSS seams more appealing to you. Either way, in this article, we will look at one of the most august CSS naming convention (BEM).

BEM stands for Block, Element, Modifier. It's a naming convention that makes CSS classes more meaningful and easier to understand. The main goal is to create clear, strict relationships between HTML and CSS.

## Key Concepts

1. Block
2. Element
3. Modifier

### 1. Block

A block is a standalone component that is meaningful on its own. It's the root of a component.

- Naming: Use lowercase letters, numbers, and dashes for multiword names.
- Example: `header`, `menu`, `search-form`

```html
<div class="header">
	<!-- Header content -->
</div>
```

### 2. Element

An element is a part of a block that has no standalone meaning. It's semantically tied to its block.

- Naming: Block name, two underscores, element name.
- Example: `header__logo`, `menu__item`, `search-form__input`

```html
<div class="header">
	<img class="header__logo" src="logo.png" alt="Logo" />
	<nav class="header__nav">
		<!-- Navigation items -->
	</nav>
</div>
```

### 3. Modifier

A modifier is a flag on a block or element that changes appearance or behavior.

- Naming: Block or element name, two dashes, modifier name.
- Example: `header--transparent`, `menu__item--active`, `search-form__input--disabled`

```html
<div class="header header--transparent">
	<img class="header__logo" src="logo.png" alt="Logo" />
	<nav class="header__nav">
		<a class="header__nav-item header__nav-item--active" href="#">Home</a>
		<a class="header__nav-item" href="#">About</a>
	</nav>
</div>
```

## CSS Structure

When using BEM, your CSS might look like this:

```css
.block {
	/* Styles */
}

.block__element {
	/* Styles */
}

.block--modifier {
	/* Styles */
}

.block__element--modifier {
	/* Styles */
}
```

## Benefits of BEM

1. **Modularity**: Each block is independent, making it easy to reuse.
2. **Clarity**: The naming convention makes it clear how elements relate to each other.
3. **Specificity**: BEM reduces the need for complex CSS selectors, keeping specificity low and consistent.
4. **Scalability**: It's easier to maintain and scale large CSS codebases.

BEM can significantly speed up development time, especially on larger projects. Having a clear naming conventions also make it easier for new team members to understand and contribute to a project quickly.

## Potential Drawbacks

While BEM offers many advantages, it's not without its challenges. The verbose class names can be off-putting to some developers, and there is a learning curve involved in adopting the methodology. However, many of us find that these initial hurdles are quickly overcome, and the long-term benefits far outweigh the initial adjustment period.

1. **Verbose class names**: BEM can lead to long class names, which some of us might find cumbersome.
2. **Learning curve**: It takes time for a team to adapt to the BEM naming convention.
3. **Overuse**: Sometimes we might apply BEM where simpler solutions would suffice.

## Best Practices

1. Keep blocks independent and self-contained.
2. Avoid creating elements of elements (e.g., `block__element1__element2`).
3. Use modifiers sparingly and meaningfully.
4. Consider combining BEM with other methodologies or CSS-in-JS solutions for larger projects.

Adhering to best practices when implementing BEM can help you avoid common pitfalls and get the most out of the methodology. These guidelines have been developed through real-world application of BEM across numerous projects and can help ensure that your implementation is as effective as possible. Remember, BEM is flexible, and these best practices should be adapted to fit the specific needs of your project.

## Example

Seeing BEM in action can often be the best way to understand its principles and benefits. This practical example demonstrates how BEM can be applied to a common web component - a search form:

```html
<form class="search-form search-form--dark">
	<input class="search-form__input" type="text" placeholder="Search..." />
	<button class="search-form__button search-form__button--primary" type="submit">
		<span class="search-form__button-text">Search</span>
	</button>
</form>
```

```css
.search-form {
	display: flex;
	padding: 10px;
}

.search-form--dark {
	background-color: #333;
}

.search-form__input {
	flex-grow: 1;
	padding: 5px;
}

.search-form__button {
	padding: 5px 10px;
	background-color: #ddd;
}

.search-form__button--primary {
	background-color: #007bff;
	color: white;
}

.search-form__button-text {
	font-weight: bold;
}
```

When implemented, BEM creates a clear, hierarchical structure that mirrors the relationships defined in the HTML. This alignment between HTML and CSS is one of the key benefits of BEM, as it makes the codebase more intuitive and easier to navigate.

BEM is particularly useful for larger projects where maintaining a clear structure is crucial. However, it's important to use it judiciously and in combination with other CSS best practices for optimal results.
