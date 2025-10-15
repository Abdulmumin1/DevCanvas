import {
	canvasConfig,
	canvasTags,
	sassActive,
	babelActive,
	typescriptActive,
	userImportedJS,
	jsPlugins,
	cssPlugins
} from '$lib/stores/playground.js';

import { hide_css, hide_js } from '$lib/config/settings.js';

export function setInitialState(current_data) {
	if (current_data.plugins?.length > 0) {
		jsPlugins.set(current_data.plugins[0].js);
		cssPlugins.set(current_data.plugins[0].css);
	}
	//console.log(current_datag);
	hide_css.set(current_data?.hide_css ?? false);
	hide_js.set(current_data?.hide_js ?? false);
	canvasTags.set(current_data.tags);
	canvasConfig.set(current_data.config);
	sassActive.set(current_data.config?.cssProcessor);
	babelActive.set(current_data.config?.babelActive);
	typescriptActive.set(current_data.config?.typescriptActive);
	userImportedJS.set(current_data.config?.userImportedJS);
}
