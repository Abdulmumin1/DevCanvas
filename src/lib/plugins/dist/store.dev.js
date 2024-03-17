"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setup_js_plugin = setup_js_plugin;
exports.injectHeadContent = injectHeadContent;
exports.loadCSS = exports.loadScript = exports.threejsCDN = exports.scrollrevealCDN = exports.framermotionCDN = exports.gsapCDN = exports.animejsCDN = exports.bootstrapLINK = exports.materialiconsLINK = exports.fontawesomeLINK = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// export const fontawesomeLINK = `<link id="fontawesomeDSFE4o431!!" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
// integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
// crossorigin="anonymous" referrerpolicy="no-referrer" />
// `;
var fontawesomeLINK = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css";
exports.fontawesomeLINK = fontawesomeLINK;
var materialiconsLINK = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"; // export const materialiconsLINK = `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />`;

exports.materialiconsLINK = materialiconsLINK;
var bootstrapLINK = "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"; // export const bootstrapLINK = `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">`;

exports.bootstrapLINK = bootstrapLINK;
var animejsCDN = "https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js";
exports.animejsCDN = animejsCDN;
var gsapCDN = "https://unpkg.com/gsap";
exports.gsapCDN = gsapCDN;
var framermotionCDN = "https://cdn.jsdelivr.net/npm/@motionone/types@10.16.3/dist/index.es.min.js";
exports.framermotionCDN = framermotionCDN;
var scrollrevealCDN = "https://unpkg.com/scrollreveal";
exports.scrollrevealCDN = scrollrevealCDN;
var threejsCDN = "https://unpkg.com/three"; // win

exports.threejsCDN = threejsCDN;
var cdns = {
  animejs: animejsCDN,
  gsap: gsapCDN,
  motionone: framermotionCDN,
  scrollreveal: scrollrevealCDN,
  threejs: threejsCDN
};

function setup_js_plugin(name, plugins, iframeDoc) {
  var pluginHTML = iframeDoc.getElementById("".concat(name, "-devcanvas-defaults")); // if (plugins[name]) {
  // 	const plugin = iframeDoc.createElement('script');
  // 	plugin.src = cdns[name];
  // 	plugin.id = `${name}DSFE4o431!!`;
  // 	if (!pluginHTML) {
  // 		// console.log('configuring plugin:', name);
  // 		// try {
  // 		// 	iframeDoc.body.appendChild(plugin);
  // 		// } catch (err) {
  // 		// 	console.log('Unable to configure plugin', name);
  // 		// }
  // 	}
  // } else {
  // 	if (pluginHTML) {
  // 		pluginHTML.remove();
  // 	}
  // }

  if (plugins[name]) {
    var plug = cdns[name];

    if (pluginHTML) {
      return;
    }

    (function _callee() {
      var sc;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(loadScript(plug, {
                id: "".concat(name, "-devcanvas-defaults")
              }));

            case 2:
              sc = _context.sent;
              iframeDoc.body.appendChild(sc);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      });
    })(); // loadScript(plug, { id: `${name}-devcanvas-defaults` }).then((script) => {
    // 	iframeDoc.body.appendChild(script);
    // });

  } // console.log(name, plugins, iframeDoc);

} // export function injectHeadContent(plugins, iframeDoc) {
// 	const tailwindScriptHTML = iframeDoc.getElementById('tailwincssDSFE4o431!!');
// 	const fontawesomeHTML = iframeDoc.getElementById('fontawesomeDSFE4o431!!');
// 	const materialiconsHTML = iframeDoc.getElementById('materialiconsDSFE4o431!!');
// 	const bootstrapHTML = iframeDoc.getElementById('bootstrapDSFE4o431!!');
// 	if (plugins.fontawesome) {
// 		// Create a temporary HTML element
// 		const tempElement = iframeDoc.createElement('div');
// 		// Set the HTML code as text
// 		tempElement.innerHTML = fontawesomeLINK;
// 		// Extract the first child element (the <link> element) from the temporary element
// 		let fontawesome = tempElement.firstElementChild;
// 		// check if it exists
// 		if (!fontawesomeHTML) {
// 			iframeDoc.head.appendChild(fontawesome);
// 		}
// 	} else {
// 		if (fontawesomeHTML) {
// 			fontawesomeHTML.remove();
// 		}
// 	}
// 	if (plugins.bootstrap) {
// 		// Create a temporary HTML element
// 		const tempElement = iframeDoc.createElement('div');
// 		// Set the HTML code as text
// 		tempElement.innerHTML = bootstrapLINK;
// 		// Extract the first child element (the <link> element) from the temporary element
// 		let bootstrap = tempElement.firstElementChild;
// 		// check if it exists
// 		if (!bootstrapHTML) {
// 			iframeDoc.head.appendChild(bootstrap);
// 		}
// 	} else {
// 		if (bootstrapHTML) {
// 			bootstrapHTML.remove();
// 		}
// 	}
// 	if (plugins.materialicons) {
// 		// Create a temporary HTML element
// 		const tempElement = iframeDoc.createElement('div');
// 		// Set the HTML code as text
// 		tempElement.innerHTML = materialiconsLINK;
// 		// Extract the first child element (the <link> element) from the temporary element
// 		let materialicons = tempElement.firstElementChild;
// 		materialicons.id = 'materialiconsDSFE4o431!!';
// 		// check if it exists
// 		if (!materialiconsHTML) {
// 			iframeDoc.head.appendChild(materialicons);
// 		}
// 	} else {
// 		if (materialiconsHTML) {
// 			materialiconsHTML.remove();
// 		}
// 	}
// 	if (plugins.tailwind) {
// 		const tailwindScript = iframeDoc.createElement('script');
// 		// tailwindScript.setAttribute('defer')
// 		tailwindScript.src = 'https://cdn.tailwindcss.com';
// 		tailwindScript.id = 'tailwincssDSFE4o431!!';
// 		if (!tailwindScriptHTML) {
// 			iframeDoc.head.appendChild(tailwindScript);
// 		}
// 	} else {
// 		if (tailwindScriptHTML) {
// 			tailwindScriptHTML.remove();
// 		}
// 	}
// }


function injectHeadContent(plugins, iframeDoc) {
  var tailwindScriptHTML = iframeDoc.getElementById('tailwind-devcanvas-defaults');
  var fontawesomeHTML = iframeDoc.getElementById('fontawesome-devcanvas-defaults');
  var materialiconsHTML = iframeDoc.getElementById('materialicons-devcanvas-defaults');
  var bootstrapHTML = iframeDoc.getElementById('bootstrap-devcanvas-defaults');

  if (plugins.fontawesome & !fontawesomeHTML) {
    // loadCSS(fontawesomeLINK, iframeDoc).then((link) => {
    // 	iframeDoc.head.appendChild(link);
    // });
    (function _callee2() {
      var link;
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(loadCSS(fontawesomeLINK, 'fontawesome-devcanvas-defaults'));

            case 2:
              link = _context2.sent;
              iframeDoc.body.appendChild(link);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      });
    })();
  }

  if (plugins.bootstrap & !bootstrapHTML) {
    // loadCSS(bootstrapLINK).then((link) => {
    // 	iframeDoc.head.appendChild(link);
    // });
    (function _callee3() {
      var link;
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(loadCSS(bootstrapHTML, 'bootstrap-devcanvas-defaults'));

            case 2:
              link = _context3.sent;
              iframeDoc.body.appendChild(link);

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      });
    })();
  }

  if (plugins.materialicons & !materialiconsHTML) {
    // loadCSS(materialiconsLINK, iframeDoc).then((link) => {
    // 	iframeDoc.head.appendChild(link);
    // });
    (function _callee4() {
      var link;
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(loadCSS(materialiconsLINK, 'materialicons-devcanvas-defaults'));

            case 2:
              link = _context4.sent;
              iframeDoc.body.appendChild(link);

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      });
    })();
  }

  if (plugins.tailwind & !tailwindScriptHTML) {
    // console.log('loading script tailwindcss');
    // loadScript('https://cdn.tailwindcss.com').then((script) => {
    // 	console.log(script);
    // 	iframeDoc.head.appendChild(script);
    // });
    (function _callee5() {
      var sc;
      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(loadScript('https://cdn.tailwindcss.com', {
                id: "tailwind-devcanvas-defaults"
              }));

            case 2:
              sc = _context5.sent;
              iframeDoc.body.appendChild(sc);

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      });
    })();
  }
}

var loadScript = function loadScript(url) {
  var options,
      _args6 = arguments;
  return regeneratorRuntime.async(function loadScript$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          options = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
          return _context6.abrupt("return", new Promise(function (resolve, reject) {
            var script = document.createElement('script');
            script.src = url;
            script.id = options.id; // if (isDuplicate(script, options.iframeDoc, options.dataAttributes)) {
            // 	reject();
            // }
            // Set default script loading behavior

            script.async = true; // Handle if it is a module

            if (options.isModule) {
              script.type = 'module';
            } // Handle defer attribute


            if (options.defer) {
              script.defer = true;
              script.async = false; // When "defer" is true, "async" should be false as they are mutually exclusive
            } // Add arbitrary data attributes


            if (options.dataAttributes && _typeof(options.dataAttributes) === 'object') {
              for (var _i = 0, _Object$entries = Object.entries(options.dataAttributes); _i < _Object$entries.length; _i++) {
                var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
                    key = _Object$entries$_i[0],
                    value = _Object$entries$_i[1];

                script.setAttribute("data-".concat(key), value);
              }
            } // Resolve the promise when the script is loaded


            script.onload = function () {
              console.log('loaded script');
              resolve(script);
            }; // Reject the promise if there's an error during load


            script.onerror = function (error) {
              return reject(new Error("Failed to load script at url: ".concat(url)));
            }; // // Append the script to the body
            // options.iframeDoc.appendChild(script);

          }));

        case 2:
        case "end":
          return _context6.stop();
      }
    }
  });
};

exports.loadScript = loadScript;

var loadCSS = function loadCSS(url, id) {
  return regeneratorRuntime.async(function loadCSS$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          return _context7.abrupt("return", new Promise(function (resolve, reject) {
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = url;
            link.id = id;

            link.onload = function () {
              console.log('loaded links');
              resolve(link);
            };

            link.onerror = function (error) {
              reject(new Error("Failed to load CSS at url: ".concat(url)));
            }; // iframeDoc.head.appendChild(link);

          }));

        case 1:
        case "end":
          return _context7.stop();
      }
    }
  });
}; // function isDuplicate(element, iframeDoc, attributeName) {
// 	// const attributeName = 'data-unique-id'; // Change this to the attribute you're using
// 	const attributeValue = element.getAttribute(attributeName);
// 	return iframeDoc.querySelectorAll(`[${attributeName}="${attributeValue}"]`).length >= 1;
// }


exports.loadCSS = loadCSS;