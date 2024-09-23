---
title: 'Form Validation with Only HTML5 and CSS'

description: 'We do a lot of form validation in web development, starting from the frontend, to the backend where the data goes. Traditionally, In the frontend side, we rely heavily on JavaScript for this task. However, modern CSS, combined with HTML5 features, are more equipped than ever for client-side form validation.'

date: '2024-07-05'

lastmod: '2024-07-05'

categories:
  - CSS

  - CSS tips

  - CSS Jots

  - form validation

published: true
---

# Introduction

We do a lot of form validation in web development, starting from the frontend, to the backend where the data goes. Traditionally, In the frontend side, we rely heavily on JavaScript for this task. However, modern CSS, combined with HTML5 features, are more equipped than ever for client-side form validation.

In this article, we'll look into how to validate forms using CSS.

### HTML5 Form Attributes

In order for to validate our forms, these HTML attributes defines our requirements, and are relied upon for the validation in CSS.

- `required`: Specifies that an input field must be filled out.
- `pattern`: Defines a regular expression that the input's value must match.
- `minlength` and `maxlength`: Set the minimum and maximum length for text input.
- `min` and `max`: Set the minimum and maximum values for numerical input.
- `type`: Specifies the type of input (e.g., email, number, url).

**Example:**

```html
<form>
	<input type="text" required minlength="3" maxlength="20" />
	<input type="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />
	<input type="number" min="0" max="100" />
	<input type="submit" value="Submit" />
</form>
```

### CSS Pseudo-classes for Form Validation

On the CSS side of this, it provides several pseudo-classes that allow us to style form elements based on their validation state:

- `:valid`: Applies to elements with valid input.
- `:invalid`: Applies to elements with invalid input.
- `:required`: Matches required elements.
- `:optional`: Matches optional elements.
- `:in-range`: Applies to elements with a value within specified range.
- `:out-of-range`: Applies to elements with a value outside the specified range.

### Basic Form Validation Styling

```css
input:valid {
	border: 2px solid green;
}

input:invalid {
	border: 2px solid red;
}

input:required {
	border-left: 4px solid blue;
}
```

This immediately invalidates before users even interact with these inputs.

![premature fom validation css](https://paper-attachments.dropboxusercontent.com/s_36441E1521DE066187273D1AEC0761A900D787701D2F54B538BD669824B54369_1720187598573_Screenshot+from+2024-07-05+14-53-06.png)

This is not the desired behavior, as the validation should only happen when you interact with subject. Thankfully, modern CSS is much more powerful, and JavaScript wouldn't need to intervene.

### Preventing Premature Invalid Styling

**One** way we can solve this is introducing the `:not()` and `:placeholder-shown` pseudo-classes:

```css
input:invalid:not(:focus):not(:placeholder-shown) {
	border: 2px solid red;
}

input:valid:not(:placeholder-shown) {
	border: 2px solid green;
}
```

Now, the invalid style will only apply if the input is invalid, not focused, and the placeholder is not shown (meaning the user has entered something).

> Invalidation will only happen when the blurs the subject.

![form validation css](https://paper-attachments.dropboxusercontent.com/s_36441E1521DE066187273D1AEC0761A900D787701D2F54B538BD669824B54369_1720187737168_Screenshot+from+2024-07-05+14-55-27.png)

> Notice that username remains in it default state since it has not be interacted with yet!

Know, this is definitely a trick some of us might prefer or find tasking, but there is a native way to solve this built right into CSS.

**Another** method is:

Instead of `valid` or `invalid` use the `user-valid` or `user-invalid`

```css
input:user-valid {
	border: 2px solid green;
}

input:user-invalid {
	border: 2px solid red;
}
```

This will allow the validation to happen only when the user interacts with it.

### Custom Validation Messages

While browsers provide default validation messages, we can create custom ones using the `::after` pseudo-element and the `:invalid` pseudo-class:

```css
input:user-invalid + span::after {
	content: '⚠ Please enter a valid value';
	color: red;
	display: block;
	margin-top: 5px;
}

input[type='number']:user-invalid + span::after {
	content: '⚠ Please enter a number between 1 - 19';
	color: red;
	display: block;
	margin-top: 5px;
}
```

![invalid form with custom message](https://paper-attachments.dropboxusercontent.com/s_36441E1521DE066187273D1AEC0761A900D787701D2F54B538BD669824B54369_1720187951531_Screenshot+from+2024-07-05+14-59-03.png)

> Remember to add a `<span>` element after each input in your HTML for this to work.

### Styling Specific Input Types

Different input types may require different validation styles. Here's an example for email inputs:

```css
input[type='email']:user-invalid {
	background: url('error-icon.svg') no-repeat 95% 50%;
	background-size: 25px;
	padding-right: 30px;
}
```

This adds an error icon to invalid email inputs.

<div class="max-w-2xl mx-auto bg-white dark:bg-primary rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-sky-100">
  <div class="p-8 bg-gradient-to-br from-sky-300 to-sky-400">
    <h3 class="text-2xl font-bold text-white mb-2">And hey, if you're itching to try them out</h3>
    <p class="text-sky-100 mb-6">Fire up Devcanvas and start experimenting with Form controls. It's the best way to get a feel for how they work!</p>
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

### Range Validation Styling

For numerical inputs with min and max values, the `in-range` and `out-of-range` pseudo-class are available:

```css
input[type='number']:in-range {
	background-color: #e8f0fe;
}

input[type='number']:out-of-range {
	background-color: #ffdddd;
}
```

### Password Strength Indicator

Using these capabilities, we can create a simple password strength indicator using just HTML5 and CSS:

```html
<form>
	<input type="password" id="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required />
	<div class="strength-meter"></div>
</form>
```

> Don’t try to understand the `regex`, just take it as it is 😅 .

```css
#password:user-valid + .strength-meter::before {
	content: 'Strong password';
	color: green;
}

#password:user-invalid + .strength-meter::before {
	content: 'Weak password';
	color: red;
}

#password[pattern]:user-valid + .strength-meter::before {
	content: 'Very strong password';
	color: darkgreen;
}
```

This provides feedback based on whether the password meets the specified pattern.

<div style="display: flex; justify-content: space-between; width: 100%;">
<img style="max-width: 49%; height: auto; object-fit: contain;" src="https://paper-attachments.dropboxusercontent.com/s_36441E1521DE066187273D1AEC0761A900D787701D2F54B538BD669824B54369_1720186876994_Screenshot+from+2024-07-05+14-41-01.png">
<img style="max-width: 49%; height: auto; object-fit: contain;" src="https://paper-attachments.dropboxusercontent.com/s_36441E1521DE066187273D1AEC0761A900D787701D2F54B538BD669824B54369_1720186916308_Screenshot+from+2024-07-05+14-40-49.png">

</div>

### Styling Form Submission

Also, while the form is invalid, we can disable the submit button just by targeting the :invalid pseudo-class:

```css
form:invalid button[type='submit'] {
	opacity: 0.5;
	pointer-events: none;
}
```

### Accessibility Considerations

While visual cues are helpful, we should also consider users who rely on screen readers. We can use `aria-invalid` and `aria-describedby` attributes to improve accessibility:

```html
<input type="email" required aria-describedby="email-error" />
<span id="email-error" role="alert"></span>
```

```css
input:invalid:not(:focus):not(:placeholder-shown) {
	aria-invalid: true;
}

input:user-invalid + #email-error::after {
	content: 'Please enter a valid email address';
}
```

However, it's important to note that CSS validation is a visual only form of validation that can significantly reduce the need for JavaScript, it's not a complete replacement for server-side validation. Always validate form submissions on the server to ensure data integrity.

As browser support for new CSS features continues to improve, we can expect even more awesome styling and improved capabilities in the future.

**Resources:**

[The :user-valid and :user-invalid pseudo-classes](https://web.dev/articles/user-valid-and-user-invalid-pseudo-classes)

[CSS3 Pseudo-Classes and HTML5 Form - HTML5 Doctor](http://html5doctor.com/css3-pseudo-classes-and-html5-forms/)

### Stay Super Awesome!
