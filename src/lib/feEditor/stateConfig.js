import {
	canvasConfig,
	canvasTags,
	sassActive,
	babelActive,
	typescriptActive,
	userImportedJS,
	jsPlugins,
	cssPlugins
} from './store.js';

export function setInitialState(current_data) {
	if (current_data.plugins?.length > 0) {
		jsPlugins.set(current_data.plugins[0].js);
		cssPlugins.set(current_data.plugins[0].css);
	}
	canvasTags.set(current_data.tags);
	canvasConfig.set(current_data.config);
	sassActive.set(current_data.config?.cssProcessor);
	babelActive.set(current_data.config?.babelActive);
	typescriptActive.set(current_data.config?.typescriptActive);
	userImportedJS.set(current_data.config?.userImportedJS);
}
