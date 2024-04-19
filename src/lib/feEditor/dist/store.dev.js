"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveData = saveData;
exports.savePlugins = savePlugins;
exports.saveConfig = saveConfig;
exports.saveTags = saveTags;
exports.editorConfig = exports.jsPlugins = exports.userImportedJS = exports.sassActive = exports.cssPlugins = exports.consoleOutput = exports.showjsConsole = exports.jsChanged = exports.javascriptStuff = exports.externalStuff = exports.showEmbedModal = exports.showModal = exports.layoutView = exports.formatCode = exports.typescriptActive = exports.babelActive = exports.dummyTitle = exports.canvasTags = exports.canvasConfig = exports.showForkTosave = exports.showLoginToSave = exports.saved_spinner = exports.showSave = void 0;

var _store = require("svelte/store");

// import { setContext } from 'svelte';
// import {}
var showSave = (0, _store.writable)(false);
exports.showSave = showSave;
var saved_spinner = (0, _store.writable)(false);
exports.saved_spinner = saved_spinner;
var showLoginToSave = (0, _store.writable)(false);
exports.showLoginToSave = showLoginToSave;
var showForkTosave = (0, _store.writable)(false);
exports.showForkTosave = showForkTosave;
var canvasConfig = (0, _store.writable)({});
exports.canvasConfig = canvasConfig;
var canvasTags = (0, _store.writable)({});
exports.canvasTags = canvasTags;
var dummyTitle = (0, _store.writable)('Hover Animation');
exports.dummyTitle = dummyTitle;
var babelActive = (0, _store.writable)(false);
exports.babelActive = babelActive;
var typescriptActive = (0, _store.writable)(false);
exports.typescriptActive = typescriptActive;
var formatCode = (0, _store.writable)(false); // export let setFormatCode =

exports.formatCode = formatCode;

function appendJSONToFormData(json, formData, which) {
  for (var key in json) {
    if (which == key || which == true) {
      formData.append(key, json[key]);
    }
  }

  formData.append('id', json['id']);
}

function saveData(json_data) {
  var which,
      formData,
      response,
      _args = arguments;
  return regeneratorRuntime.async(function saveData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          which = _args.length > 1 && _args[1] !== undefined ? _args[1] : true;
          formData = new FormData();
          saved_spinner.set(true); // showSave.set(true);

          appendJSONToFormData(json_data, formData, which);
          _context.next = 6;
          return regeneratorRuntime.awrap(fetch('?/update', {
            method: 'POST',
            body: formData
          }));

        case 6:
          response = _context.sent;

          if (response.ok) {
            // Handle save success
            console.log('full');
          } else {
            // Handle save failed
            console.log('failed');
          }

          saved_spinner.set(false);
          showSave.set(false);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
}

function savePlugins(json_data, id) {
  var formData, response;
  return regeneratorRuntime.async(function savePlugins$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          formData = new FormData();
          saved_spinner.set(true); // showSave.set(true);

          formData.append('plugins', JSON.stringify(json_data));
          formData.append('id', id);
          _context2.next = 6;
          return regeneratorRuntime.awrap(fetch('?/update', {
            method: 'POST',
            body: formData
          }));

        case 6:
          response = _context2.sent;

          if (response.ok) {
            // Handle save success
            console.log('plugin saved');
          } else {
            // Handle save failed
            console.log('failed');
          }

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function saveConfig(json_data, id) {
  var formData, response;
  return regeneratorRuntime.async(function saveConfig$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          formData = new FormData();
          saved_spinner.set(true); // showSave.set(true);

          formData.append('config', JSON.stringify(json_data));
          formData.append('id', id);
          _context3.next = 6;
          return regeneratorRuntime.awrap(fetch('?/update', {
            method: 'POST',
            body: formData
          }));

        case 6:
          response = _context3.sent;

          if (response.ok) {
            // Handle save success
            console.log('config saved');
          } else {
            // Handle save failed
            console.log('failed');
          }

        case 8:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function saveTags(json_data, id) {
  var formData, response;
  return regeneratorRuntime.async(function saveTags$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          formData = new FormData();
          saved_spinner.set(true); // showSave.set(true);

          formData.append('tags', JSON.stringify(json_data));
          formData.append('id', id);
          _context4.next = 6;
          return regeneratorRuntime.awrap(fetch('?/update', {
            method: 'POST',
            body: formData
          }));

        case 6:
          response = _context4.sent;

          if (response.ok) {
            // Handle save success
            console.log('Tags saved');
          } else {
            // Handle save failed
            console.log('failed');
          }

        case 8:
        case "end":
          return _context4.stop();
      }
    }
  });
}

var layoutView = (0, _store.writable)('left');
exports.layoutView = layoutView;
var showModal = (0, _store.writable)(false);
exports.showModal = showModal;
var showEmbedModal = (0, _store.writable)(false);
exports.showEmbedModal = showEmbedModal;
var externalStuff = (0, _store.writable)({
  html: '',
  css: ''
});
exports.externalStuff = externalStuff;
var javascriptStuff = (0, _store.writable)({
  main: ''
});
exports.javascriptStuff = javascriptStuff;
var jsChanged = (0, _store.writable)(false);
exports.jsChanged = jsChanged;
var showjsConsole = (0, _store.writable)(false);
exports.showjsConsole = showjsConsole;
var consoleOutput = (0, _store.writable)([]);
exports.consoleOutput = consoleOutput;
var cssPlugins = (0, _store.writable)({
  tailwind: false,
  bootstrap: false,
  fontawesome: false,
  materialicons: false,
  googlefonts: false,
  bulma: false
});
exports.cssPlugins = cssPlugins;
var sassActive = (0, _store.writable)(false);
exports.sassActive = sassActive;
var userImportedJS = (0, _store.writable)([]);
exports.userImportedJS = userImportedJS;
var jsPlugins = (0, _store.writable)({
  animejs: false,
  gsap: false,
  motionone: false,
  threejs: false,
  velocity: false,
  popmotion: false,
  scrollreveal: false
});
exports.jsPlugins = jsPlugins;
var editorConfig = {
  automaticLayout: true,
  renderIndentGuides: false,
  tabSize: 2,
  formatOnPaste: true,
  fontFamily: '"Monolisa", Menlo, "Source Code Pro", monospace',
  fontSize: 15,
  emmet: {
    enabled: true // Enable Emmet support

  },
  minimap: {
    enabled: false
  } // ...(window.innerWidth <= 600 && { fontSize: 11, wordWrap: 'on' })

};
exports.editorConfig = editorConfig;