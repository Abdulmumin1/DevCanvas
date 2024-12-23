import { darkModeState } from '$lib/index.js';

export const actions = (goto) => {
	return [
		{
			id: 'explore',
			title: 'Community',
			subtitle: 'Explore awesome creations by the community',
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
			id: 'dashboard',
			title: 'Dashboard',
			// subtitle: '',
			callback: () => {
				goto('/dashboard');
			}
		},

		{
			id: 'theme',
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
			id: 'start',
			title: 'Star us Github',
			subtitle: 'Star ⭐ DevCanvas Github',
			callback: () => {
				goto('https://github.com/Abdulmumin1/devcanvas');
			}
		}
		// ... add more actions as needed
	];
};
