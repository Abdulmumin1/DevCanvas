---
title: 'The :is() and :where() selectors in CSS'

description: 'They allow you to create more concise and maintainable CSS code by grouping selectors and applying styles to them. The difference in both the selector functions is specificity, which makes it easier to override styles.'

date: '2024-04-03'

lastmod: '2024-04-03'

categories:
  - CSS
  - specificity
  - css selectors
  - breakdowns

published: true

thumbnail: '/devCanvas.png'
---

`:is()` and `:where()` are CSS functional pseudo-classes introduced in the Selectors Level 4 specification. They allow you to create more concise and maintainable CSS code by grouping selectors and applying styles to them.

## _:is()_ Selector Function

The `:is()` selector function is used to apply a set of styles to a group of selectors. It takes a list of selectors as its argument and matches elements that match any of the selectors in the list.

Here is an example:

```css
:is(header, footer) a:hover {
	color: green;
	text-decoration: underline;
}
```

In this example, the `:is()` selector function is used to apply the `a:hover` styles to the `<header>` and `<footer>` elements.

## _:where()_ Selector Function

The `:where()` selector function is similar to `:is()` selector function, but it has a different specificity value. The `:where()` selector function has a specificity value of zero, which makes it easier to override styles.

## Example with Tags;

```css
:where(article, section, aside) {
	color: gray;
}

article {
	color: red;
}
```

In this example, the `:where()` selector function is used to apply the `color: gray` style to the `<article>`, `<section>`, and `<aside>` elements. However, if you apply a different `color` style to the `<article>` element, it will take precedence over the `:where()` selector function.

## Example with classes;

```css
:is(.info, .notice) {
	color: red;
	font-weight: bold;
}
```

In this example, the `:is()` selector function is used to apply the `color: red` and `font-weight: bold` styles to elements that have the `.info` or `.notice` class.

Similarly, the `:where()` selector function is used to apply styles to a group of selectors with a specificity value of zero. So, you can use `:where()` to apply styles to multiple class selectors without worrying about their specificity.

Here is an example:

```css
:where(.info, .notice) {
	color: red;
	font-weight: bold;
}
```

In this example, the `:where()` selector function is used to apply the `color: red` and `font-weight: bold` styles to elements that have the `.info` or `.notice` class. The specificity value of `:where()` is zero, so it will not override other styles with higher specificity.

> Note that both `:is()` and `:where()` selector functions can take a list of class selectors as their argument, separated by commas. Also, you can use them with any other selectors, not just class or tag selectors.

## Browser Support

Both `:is()` and `:where()` selector functions are supported in all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. However, it is not supported in Internet Explorer (obviously 😅).

## Conclusion

The `:is()` and `:where()` selector functions are powerful CSS functional pseudo-classes that can help you create more concise and maintainable CSS code. They are supported in all modern browsers, but they are not supported in Internet Explorer.

For more information and examples, you can check the following resources:

- [CSS :is() Function](https://www.w3schools.com/cssref/func_is.asp)
- [CSS :where() Function](https://www.w3schools.com/cssref/func_where.asp)
- [CSS :is() and :where() pseudo-classes](https://css-tricks.com/almanac/selectors/i/is-where/)
- [CSS Custom Properties (official MDN documentation)](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
