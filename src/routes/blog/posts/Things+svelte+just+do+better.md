---
title: Things svelte just do better!

description: post description

date: '2023-08-15'

categories:
  - svelte

  - webdev

  - react

published: true,
thumbnail: 'https://cdn.hashnode.com/res/hashnode/image/upload/v1692090552577/30933fc0-c9d7-4a29-a1cd-6a68f494a6c7.png'
---

In the world of javascript, React dominates. It just feels like where ever you go on its map, React is just there, you really can't escape encountering it everywhere you turn. It makes sense though, because when it was created, it was the most revolutionary, and so many adopted it, causing even frontend to sound like you're saying React!

I think it is time to move on. Yes yes 😒, I know, you don't have to refactor all of your codebase to Svelte, but you should consider trying it out. I must warn you though, you might be tempted to refactor your entire company's codebase to svelte once you've experienced its beauty and simplicity.

Here in this article, I want to share with you some of the cool 😎 stuff Svelte has to offer. One last thing before we jump in, you shouldn't feel too bad when you realise you've been going through soo much just to set up simple stuff. Trust me guys, I can feel your pain.

## Built-in Everything

Seriously, using Svelte, you have fewer things to worry about, and no need to install unnecessary packages for basic things. Svelte by default has taken care of lots of the simple things. Compared to React, you install soo many packages for basic tasks. imports take so many lines and that is where the confusion starts for anyone reading your code.

To have most of the cool stuff built into the framework is truly amazing, you don't have to worry about integration issues, and would be harder to mess things up or use them wrongly.

## Overall better design

Everyone can agree that Svelte has an overall better design for building components. you'll notice a few key concepts and patterns that differ from other frameworks like React or Vue. And that's the beauty, It is super easy to adapt to the design. Styles are scoped in svelte components which is greate, because you don't have to jump between your CSS file and the component. Everything the component need is bundled with it!

A Svelte component typically contains its template, logic, and styles. This approach makes it easier to manage and maintain components.

Another fascinating thing to me is that you don't have to rewire your brain to adapt to the convention of Svelte, unlike React, _classes_ are to be written as _className_ and so many other little things you're familiar with get changed in one way or another.

**Example**

```html
<script>
	// all of your js functions, imports and stuff
</script>

<div>
	<!--  your component html -->
</div>

<style>
	/* all of your styling goes here */
</style>
```

## State Management

Honestly, state management in Svelte is so cool and so much easier to set up. Simplicity is one of the standout features of Svelte. Svelte's approach to state management is designed to be intuitive and straightforward.

Setting up a **_shared state_** in Svelte unlike other frameworks, is not very tricky at all, and does not require you to install external packages. _built-in everything_

Svelte provides the concept of stores. Stores are reactive containers for data that can be shared between components. Svelte includes built-in stores like `writable` and `readable`, and you can also create custom stores.

**Example**

```js
// index.js
import { writable } from 'svelte/stores';

export let logged_in = writable(false);
```

You can read a store in your component like this:

```html
<!--Signin.svelte-->
<script>
	import { logged_in } from '$lib/index.js';
</script>

<div>
	{#if $logged_in}
	<button>Log Out</button>
	{:else}
	<button>Log In</button>
	{/if}
</div>
```

## Routes (SvelteKit)

The way routes are done in Svelte is so much more comfortable and easy, not only how easy it is to create them but also to work with them as well. Routes in Svelte can have separate files that handle data fetching for the pages, which can be either run on both the server and client sides or only the server side.

The syntax is so neat, you will be blown away. SvelteKit uses filesystem-based routing, which means that the *routes* of your app — in other words, Every `+page.svelte` file inside a folder or sub-folder in the `src/routes` create a page in your app.

**Example**

- routes
  - +page.svelte - _root_
  - about
    - +page.svelte
  - blog
    - +page.svelte
    - newsletter
      - +page.svelte

The routes are rendered exactly as they appear here. the newsletter page for example will look something like this `/blog/newsletter`

Navigating between routes doesn't fully reload a page, but rather updates the content of the page like a single-page application. This makes navigation between pages almost instant, resulting in a better user experience.

## The tiny sweet things

### 1\. reactivity

To make any variable reactive in Svelte, all you need to do is add a money sign and a colon behind it.

**Example**

```html
<script>
	$: reactive = 'this variable can react to changes';
</script>
```

### 2\. Toggle classes

Svelte has a built-in solution for toggling classes based on the particular state, Maybe you want to change the background color, if a particular state changes, or maybe if a particular variable is set to true, Svelte got you covered and it is super easy to do.

```html
<script>
	let toggle = false;
</script>

<button class="background-red" class:background-orange="{toggle}">Click me</button>
```

What we just added will toggle "background-orange" based on whether the _toggle_ variable is true/false.

### 3\. Transitions

Svelte has built-in support for animations and transitions, making it a comfortable ride for creating smooth and visually appealing UI effects. To be honest, In my entire experience with web development and CSS, I have never tried making a simple animation by myself, and yet they are everywhere In the websites I have built.

### 4\. Binding

This one is just lit 🔥. You can directly bind event listeners to DOM elements using a simple syntax.

This example shows how you can easily bind a variable to the value of an input field.

```html
<script>
	let inputText;
</script>

<input bind:value="{inputText}" />
```

Svelte provides event modifiers that make it easy to handle common scenarios. For instance, you can use the `preventDefault` modifier to prevent the default behavior of an event.

```html
<form on:submit|preventDefault="{handleSubmit}">
	<input type="text" />
	<button type="submit">Submit</button>
</form>
```

### Conclusion

Svelte design philosophy emphasizes developer productivity, efficient runtime performance, and a delightful user experience, making it a compelling choice for building both small projects and large-scale applications.

Some consider Svelte unfair, taking to account that it has a compiler, but hey, why don't others also just create a compiler to make their framework fun and easy to work with?

Svelte is a really powerful framework, yet the simplicity it offers just sets it apart from the pack. This thing can literally turn you into a wizard 🎩, I mean, you can perform magik with this thing!

**Happy coding!**
