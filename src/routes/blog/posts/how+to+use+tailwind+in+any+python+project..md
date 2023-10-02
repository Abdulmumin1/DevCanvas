---
title: How to use TailwindCSS in any Python project
description: post description
date: '2023-07-18'
categories:
  - python
  - tailwindcss
  - css
  - flask

published: true
thumbnail: 'https://cdn.hashnode.com/res/hashnode/image/upload/v1689698707376/a662bd87-8cef-4c61-be7f-d4177410578d.png'
---

We all really love TailwindCSS, I mean some don't, but even if you've never tried it, you've heard about it and maybe you are not soo much of a javascript dev, so setting it up in your project might become quite a hassle.

You might not even know what npm, npx or javascript gazillions of stuff and commands does, or maybe you tried to follow the tailwind installation guide step by step and you end up having alien files in your project you don't seem to understand.

To be honest, I was once in this situation too, getting into the mess of javascript definitely caused me a lot of headaches, and would struggle to understand what is happening to my project.

In this article, I present to you a solution to your problem, that is, taking away the hassle of setting up Tailwind in a non-javascript project.

1. Introducing tailwindpie

2. How tailwindpie works

3. Guide to using tailwindpie

4. Prerequisite/requirements

5. Installing tialwindpie on your machine

6. Setting up tailwind in any project

7. Demo project with Flask.

## Introducing tailwindpie

**tailwindpie** is a pip package that automates the process of installing and configuring tailwindCSS in any project, it is mostly around the mindset of Python projects, but it can literary be used to automate installation and setting up tailwind even in javascript projects.

The idea around **tailwindpie** is to help us, as Python devs to care less about the javascript noise of just running one simple command, and BOOM, you have tailwind setup for your project.

Another thing I tried to automate with tailwindpie is adding all the unnecessary javascript files to **.gitignore** so non of those noise moves around with your project.

That's it!!

## How to use tailwindpie

### Requirements

Because TailwindCSS depends on node and stuff, you are going to need to have the following installed

- Nodejs

- npm - comes with node, so no worries.

## Installation

To install tailwindpie on your machine.

```bash
pip install tailwindpie
```

In your project directory/folder, run

```bash
$ tailwindpie config
```

Lastly,

In the created tailwind.config.js, replace it with the folder that contains all of your html files.

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./folder that contains your html/**/*.{html,js}'],
	theme: {
		extend: {}
	},
	plugins: []
};
```

Ok, one more thing

update the package.json with where you want to store the generated CSS,

```json
"css": "npx tailwindcss -i ./input.css -o .STATIC_CSS_FOLDER/tailwind.css --watch"
```

> **Note**: make sure the folder is created!

In your HTML, add the path to the CSS.

```html
<link rel="stylesheet" type="text/css" href="{{ url_for('static', filename='css/tailwind.css')}}" />
```

In this case, we are using it in the base.html file of a Flask project!

## Build CSS

once you have all this properly set up, you can then build the CSS.

```bash
$ tailwindpie build
```

These commands will continue to run and track changes in your HTML and rebuild the CSS.

**Why?**

On the initial build of tailwindCSS, not all the classes are created and written into the 'tailwind.css' file. I mean it doesn't even make any sense, There are ten of thousands of classes available in Tailwind and this can even extend further.

This is why Tailwind tracks changes in your files and only adds to the CSS file, classes that you've used in your project.

> When you are done, you can stop the build command with **Ctrl + C**

# BOOM!!!

Let the magik of Tailwind begins.

## Using Tailwindpie in a Flask project

So I'm going to do a little demo of **tailwindpie** in a flask project, it going to be super quick and easy.

1. Start a Flask project

2. Configure tailwind

3. Write some classes

4. Boom!!!.

Very quickly, we create the following project structure.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1689696786488/7e7a49bc-da11-48a4-abe5-b6b4e2e16782.png)

app.py

```python
from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
```

index.html

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1689696818273/b5960235-984a-4866-9e1c-5e018b9a185e.png)

So now we can setup tailwind in our project by running

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1689696842137/4dceea49-d5ad-4337-9428-585f7429ff57.png)

Now, we have TailwindCSS configured for our project. Definitely easier than the traditional way,

What is left is to configure our paths.

in package.json

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1689696866129/9fee958b-ea82-4e9f-b272-1248bab21c7d.png)

then tailwind.config.js

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1689696884030/a0b4af37-707a-4ecf-97d5-7881a82e31eb.png)

we can now link that path to our HTML

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1689696901897/da1e11f4-5d0f-4f07-9887-14ee84708f1a.png)

Finally, it is time to write some classes.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1689696919069/8c2e3e43-41a7-478e-a353-d9d7f2048dec.png)

Great, but before we preview our changes, we have to build our css, mostly you should run `tailwindpie build` and keep it running in the background.

when we run that, we see an output like this!

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1689696940286/09414ea0-d6a7-4cf0-84f1-c33e875137ff.png)

Yeah, that's it! If your Flask server is up and running, we can view our changes in the browser.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1689696965470/886f1e4e-7adf-4083-bddd-a7f1df69bf86.png)

Greate! This is looking amazing, and there you have it, TailwindCSS in your Python project.

You can **star** the project repository if you find this interesting

[https://github.com/Abdulmumin1/tailwindpie](https://github.com/Abdulmumin1/tailwindpie)

### Bonus

If you don't have the TailwindCSS intelliSense extension installed in vscode, make sure to do it, it really makes things super easy.

[https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

**Happy Coding!**
