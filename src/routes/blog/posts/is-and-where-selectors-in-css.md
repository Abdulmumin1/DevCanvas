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

<div class="max-w-2xl mx-auto bg-white dark:bg-primary rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-sky-100">
  <div class="p-8 bg-gradient-to-br from-sky-300 to-sky-400">
    <h3 class="text-2xl font-bold text-white mb-2">And hey, if you're itching to try them out</h3>
    <p class="text-sky-100 mb-6">Fire up Devcanvas and start experimenting with the :is and :where selectors. It's the best way to get a feel for how they work!</p>
    <div class="flex items-center space-x-4">
      <a href="/play/try" class="px-6 py-3 bg-white  text-sky-500 font-semibold rounded-lg shadow-md  hover:bg-sky-50 transition-colors duration-300 flex items-center" style="text-decoration:none;">
        Try it on Devcanvas
      </a>
      <a href="/" class="text-white  hover:text-sky-100 transition-colors duration-300 flex items-center">
        Learn more
        <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </a>
    </div>
  </div>
  <div class="px-8 py-6 bg-sky-50 flex justify-between items-center">
    <div class="flex items-center space-x-2">
      <svg class="w-5 h-5 text-sky-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
      </svg>
      <span class="text-sky-600 font-medium">Beginner-friendly</span>
    </div>
    <div class="flex items-center space-x-2">
      <svg class="w-5 h-5 text-sky-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
      </svg>
      <span class="text-sky-600 font-medium">Interactive Code Sandbox</span>
    </div>
  </div>
</div>

For more information and examples, you can check the following resources:

- [CSS :is() Function](https://www.w3schools.com/cssref/func_is.asp)
- [CSS :where() Function](https://www.w3schools.com/cssref/func_where.asp)
- [CSS :is() and :where() pseudo-classes](https://css-tricks.com/almanac/selectors/i/is-where/)
- [CSS Custom Properties (official MDN documentation)](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
