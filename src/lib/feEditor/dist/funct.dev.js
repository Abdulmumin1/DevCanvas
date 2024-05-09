"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setReloadContext = setReloadContext;
exports.getReload = getReload;

var _svelte = require("svelte");

var _store = require("svelte/store");

function setReloadContext() {
  (0, _svelte.setContext)('reloadEditor', (0, _store.writable)(null));
}

function getReload() {
  return (0, _svelte.getContext)('reloadEditor');
}