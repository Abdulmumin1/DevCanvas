---
title: 'CSS Combinators for beginners: CSS jots'

description: 'CSS combinators are tools that allows you to create more efficient and maintainable stylesheets. With combinators, you can often ditch a bunch of extra classes and IDs in your HTML.'

date: '2024-08-28'

lastmod: '2024-08-28'

categories:
  - CSS

  - CSS tips

  - CSS Jots

  - combinators

published: true
---

CSS combinators are tools that allows you to create more efficient and maintainable stylesheets. With combinators, you can often ditch a bunch of extra classes and IDs in your HTML.

## What Are CSS Combinators?

CSS combinators are special characters that define relationships between selectors. They allow you to target specific elements based on their position in the document tree.

![DOM Tree](https://paper-attachments.dropboxusercontent.com/s_C3790ED91C6B8E6D3B54DC095694E8D74617281FEA61C1C2AF62729E6F3ED0DC_1724841801553_dom_tree.gif)

There are four main types of combinators:

1. Descendant combinator (space)
2. Child combinator (>)
3. Adjacent sibling combinator (+)
4. General sibling combinator (~)

![A simple diagram showing the four combinator symbols with brief labels](https://paper-attachments.dropboxusercontent.com/s_C3790ED91C6B8E6D3B54DC095694E8D74617281FEA61C1C2AF62729E6F3ED0DC_1724837322237_Copy+of+Copy+of+Content.png)

## 1. Descendant Combinator (Space)

The descendant combinator is represented by a space between two selectors. It matches elements that are descendants of the first element, regardless of how deeply nested they are.

```css
article p {
	color: #333;
}
```

![A tree-like structure showing an article element with multiple levels of nested p elements, all highlighted to show they're targeted](https://paper-attachments.dropboxusercontent.com/s_C3790ED91C6B8E6D3B54DC095694E8D74617281FEA61C1C2AF62729E6F3ED0DC_1724838822155_Copy+of+Copy+of+Content2.png)

This rule targets all `<p>` elements that are descendants of an `<article>` element, no matter how many levels deep they are in the DOM tree.

**When to Use:**

- Styling content within a specific section
- Applying general rules to a large group of elements

Be cautious with descendant combinators in large documents, as they can affect performance if overused (for performance nerds 🤓).

## 2. Child Combinator (>)

The child combinator targets direct children of an element. It's more specific than the descendant combinator and is represented by the ">" symbol.

```css
ul > li {
	list-style-type: square;
}
```

![A diagram showing a ul element with direct li children highlighted, and nested li elements not highlighted](https://paper-attachments.dropboxusercontent.com/s_C3790ED91C6B8E6D3B54DC095694E8D74617281FEA61C1C2AF62729E6F3ED0DC_1724838878332_Copy+of+Copy+of+Content3.png)

This rule applies only to `<li>` elements that are direct children of a `<ul>`.

**When to Use:**

- Styling immediate children without affecting nested elements
- Creating clear parent-child relationships in your styles

Use the child combinator to avoid unintended styling of nested lists or similar structures. It's perfect when you want to target elements that are immediately nested inside another element, without affecting similar elements deeper in the structure.

## 3. Adjacent Sibling Combinator (+)

The adjacent sibling combinator selects an element that comes immediately after another specific element, sharing the same parent.

```css
h1 + p {
	font-size: 1.2em;
	font-weight: bold;
}
```

![A layout diagram showing an h1 element followed by several p elements, with only the first p element after the h1 highlighted](https://paper-attachments.dropboxusercontent.com/s_C3790ED91C6B8E6D3B54DC095694E8D74617281FEA61C1C2AF62729E6F3ED0DC_1724839664778_Copy+of+Copy+of+Content5.png)

This rule targets the first `<p>` element that comes directly after an `<h1>`, giving it a larger font size and bold weight.

**When to Use:**

- Styling elements based on their order in the document
- Creating visual relationships between adjacent elements

The adjacent sibling combinator is great for creating spacing between elements without adding extra markup.

## 4. General Sibling Combinator (~)

The general sibling combinator selects all elements that are siblings of a specified element, coming after it in the document tree.

```css
h2 ~ p {
	margin-left: 20px;
}
```

![A layout showing an h2 element followed by various elements, with all p elements after the h2 highlighted](https://paper-attachments.dropboxusercontent.com/s_C3790ED91C6B8E6D3B54DC095694E8D74617281FEA61C1C2AF62729E6F3ED0DC_1724839964139_Copy+of+Copy+of+Content6.png)

This rule applies to all `<p>` elements that are siblings of and follow an `<h2>` element.

**When to Use:**

- Applying styles to multiple siblings after a certain element
- Creating consistent spacing or styling for groups of elements

The general sibling combinator is useful for styling dynamic content where you don't know exactly how many elements will follow. This is super handy when you want to style multiple elements that follow a certain element, without being picky about their exact position.

## Combining Combinators for Powerful Selections

The super magic happens when you combine these combinators to create highly specific and efficient selectors:

```css
.article-content > p + p {
	text-indent: 1em;
}
```

![A text layout showing paragraphs within an article, with all paragraphs except the first one selected](https://paper-attachments.dropboxusercontent.com/s_C3790ED91C6B8E6D3B54DC095694E8D74617281FEA61C1C2AF62729E6F3ED0DC_1724840410562_Copy+of+Copy+of+Content7.png)

This rule indents all paragraphs within `.article-content`, except for the first one, creating a traditional book-like text layout.

## Pro Tip:

Now, don't go combo-crazy! Like with any powerful tool, it's all about balance. Sure, you can write some really specific selectors, but remember:

- **Keep it readable:** If your future self can't understand it, it's too complex.
- **Watch out for performance:** Super specific selectors can slow things down a bit.
- **Maintainability is key:** Think about how easy it'll be to update your styles later.

## Conclusion

The best way to get the hang of combinators? Experiment! Use them into your next project and see what happens. Play around, break things, fix them, and before you know it, you'll be writing CSS that's cleaner, more efficient, and dare I say it – even fun!

Let me have any question in the comments!

**Stay Super Awesome.**
