import { setContext, getContext } from 'svelte';
import { writable } from 'svelte/store';

export function setReloadContext() {
	setContext('reloadEditor', writable(null));
}

export function getReload() {
	return getContext('reloadEditor');
}
