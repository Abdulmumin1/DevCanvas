"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _adapterAuto = _interopRequireDefault(require("@sveltejs/adapter-auto"));

var _vitePluginSvelte = require("@sveltejs/vite-plugin-svelte");

var _mdsvex = require("mdsvex");

var _shiki = require("shiki");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
var mdsvexConf = {
  extensions: ['.md'],
  highlight: {
    highlighter: function highlighter(code) {
      var lang,
          html,
          _args = arguments;
      return regeneratorRuntime.async(function highlighter$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              lang = _args.length > 1 && _args[1] !== undefined ? _args[1] : 'text';
              _context.next = 3;
              return regeneratorRuntime.awrap((0, _shiki.codeToHtml)(code, {
                lang: lang,
                themes: {
                  dark: 'andromeeda',
                  light: 'catppuccin-latte'
                }
              }));

            case 3:
              html = _context.sent;
              return _context.abrupt("return", "{@html `".concat(html, "`}"));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }
};
/** @type {import('@sveltejs/kit').Config} */

var config = {
  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: (0, _adapterAuto["default"])(),
    alias: {
      $components: 'src/components'
    }
  },
  extensions: ['.svelte', '.md'],
  preprocess: [(0, _vitePluginSvelte.vitePreprocess)(), (0, _mdsvex.mdsvex)(mdsvexConf)]
};
var _default = config;
exports["default"] = _default;