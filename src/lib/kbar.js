import { darkModeState } from '$lib/index.js';

export const actions = (goto) => {
	return [
		{
			id: 'explore',
			title: 'Home',
			subtitle: 'Explore cool stuff',
			callback: () => {
				goto('/explore');
			}
		},
		{
			id: 'blog',
			title: 'Blog',
			// subtitle: '',
			callback: () => {
				goto('/blog');
			}
		},

		{
			id: 'blog',
			title: 'Dashboard',
			// subtitle: '',
			callback: () => {
				goto('/dashboard');
			}
		},

		{
			id: 'blog',
			title: 'Change Theme',
			// subtitle: '',
			nested: [
				{
					id: 'darkmode',
					title: 'Light Mode',
					// subtitle: '',
					callback: () => {
						darkModeState.update(() => {
							return false;
						});
					}
				},

				{
					id: 'darkmode',
					title: 'Dark Mode',
					// subtitle: '',
					callback: () => {
						darkModeState.update(() => {
							return true;
						});
					}
				}
			]
		},
		{
			id: 'newcanvas',
			title: '+ New Canvas',
			subtitle: 'Create a New Canvas/Editor',
			callback: () => {
				goto('/play/try');
			}
		},

		{
			id: 'newcanvas',
			title: 'Star us Github',
			subtitle: 'Star ⭐ DevCanvas Github',
			callback: () => {
				goto('https://github.com/Abdulmumin1/devcanvas');
			}
		}
		// ... add more actions as needed
	];
};
