# DevCanvas

![devcanvas Logo](/static/devcanvas.png)

An online AI editor with super powers, fast preview, plugins and super cool library of cool Frontend creations for your inspiration.

## Stack

<table>

<tbody>

<tr>

<td align="Center" width="30%">

<a href="https://kit.svelte.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/svelte-colored.svg" width="36" height="36" alt="Svelte" /></a>
<br>Sveltekit

</td>

<td align="Center" width="30%">

<a href="https://supabase.com/" target="_blank" rel="noreferrer"><img src="https://cf.appdrag.com/dashboard-openvm-clo-b2d42c/uploads/supabase-TAiY.png" width="36" height="36" alt="Supabase" /></a>
<br>Supabase

</td>
<td align="Center" width="30%">

<a href="https://tailwindcss.com/" target="_blank" rel="noreferrer"><img src="https://img.icons8.com/color/144/000000/tailwindcss.png" width="36" height="36" alt="TailWind" /></a>
<br>Tailwind CSS

</td>
</tr>

</tbody>

</table>

## Table of Contents

- [Features](#features)
- [Installation](#installation-locally)
- [Usage](#usage)
- [Contributing](#contributing)
- [Getting Help](#getting-help)
- [License](#license)
- [Support](#support)

## Features

- Interactive Frontend Editor
- Easy code snippet sharing (any other language).
- Discover and explore a wide range of code snippets and awesome frontend creations.
- A powerfull editor (codemirror) for a smooth coding experience.
- Support for multiple programming languages.
- User profiles with personal code snippet collections.

## Installation (Local developement)

1. Clone the repository: `git clone https://github.com/Abdulmumin1/devcanvas.git`
2. Navigate to the project directory: `cd devcanvas`
3. Install dependencies: `npm install` or `yarn install`
4. Create and add the folowing to your .env file:

```txt
VITE_PUBLIC_SUPABASE_URL='http://whateverurl'
VITE_PUBLIC_SUPABASE_ANON_KEY="whateverkeyhere"

```

> Note: These env variable will cause an error if not created, we're planing to make it possible to spin up our supabase instance locally pretty soon... that why only frontend contributions are possible at the moment

## Usage

1. Run the development server: `npm run dev` or `yarn dev`
2. Open your web browser and visit: `http://localhost:5173`

## Contributing

We enthusiastically welcome contributions from the community to enhance DevCanvas! Here's how you can contribute:

### Types of Contributions

- **Frontend Improvements:** As our backend is not publicly available, most contributions should focus on frontend enhancements.
- **Blog Posts:** We accept frontend-related articles for our blog.
- **Documentation:** Help improve our README, inline code comments, or create user guides.
- **Bug Reports:** If you find a bug, please create an issue with a detailed description.
- **Feature Requests:** Have an idea? We'd love to hear it! Create an issue to propose new features.
- **Code Improvement:** There is alot of bad code in devcanvas currently, we would your contributions that could improve that.

## Contribution Process

- Fork the repository.
- Create a new branch for your feature, fix, or improvement:

```bash
git checkout -b my-contribution
```

Make your changes, ensuring they adhere to our coding style and conventions.

Commit your changes with a clear, descriptive message:

```bash
git commit -m "Add new feature: Brief description"
```

Push your changes to your forked repository:

```bash
git push origin my-contribution
```

Create a pull request to the main DevCanvas repository, providing a detailed description of your changes.

## Code Style and Guidelines

Follow the existing code style in the project.
Write clear, commented code to enhance readability.
Ensure your code is properly formatted and lint-free.

## Getting Help

If you need assistance or have questions about contributing, please:

- Check our existing issues and pull requests to see if your question has been addressed.

- Create a new issue with the "question" label if you need further clarification.

We appreciate your interest in improving DevCanvas and look forward to your contributions!

## License

DevCanvas is licensed under the [Non Commercial License](./LICENSE).

## Support

If you encounter any issues or have questions, please feel free to create an issue or contact us at [abdulmuminyqn@gmail.com](mailto:abdulmuminyqn@gmail.com).
