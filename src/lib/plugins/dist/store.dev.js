"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setup_js_plugin = setup_js_plugin;
exports.injectHeadContent = injectHeadContent;
exports.loadScriptFromURL = loadScriptFromURL;
exports.threejsCDN = exports.scrollrevealCDN = exports.framermotionCDN = exports.gsapCDN = exports.animejsCDN = exports.bootstrapLINK = exports.materialiconsLINK = exports.fontawesomeLINK = void 0;
var fontawesomeLINK = "<link id=\"fontawesomeDSFE4o431!!\" rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css\"\nintegrity=\"sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==\"\ncrossorigin=\"anonymous\" referrerpolicy=\"no-referrer\" />\n";
exports.fontawesomeLINK = fontawesomeLINK;
var materialiconsLINK = "<link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200\" />";
exports.materialiconsLINK = materialiconsLINK;
var bootstrapLINK = "<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css\" integrity=\"sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65\" crossorigin=\"anonymous\">";
exports.bootstrapLINK = bootstrapLINK;
var animejsCDN = "https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js";
exports.animejsCDN = animejsCDN;
var gsapCDN = "https://unpkg.com/gsap";
exports.gsapCDN = gsapCDN;
var framermotionCDN = "https://cdn.jsdelivr.net/npm/@motionone/types@10.16.3/dist/index.es.min.js";
exports.framermotionCDN = framermotionCDN;
var scrollrevealCDN = "https://unpkg.com/scrollreveal";
exports.scrollrevealCDN = scrollrevealCDN;
var threejsCDN = "https://unpkg.com/three";
exports.threejsCDN = threejsCDN;
var cdns = {
  animejs: animejsCDN,
  gsap: gsapCDN,
  motionone: framermotionCDN,
  scrollreveal: scrollrevealCDN,
  threejs: threejsCDN
};

function setup_js_plugin(name, plugins, iframeDoc) {
  var pluginHTML = iframeDoc.getElementById("".concat(name, "DSFE4o431!!"));

  if (plugins[name]) {
    // const plugin = iframeDoc.createElement('script');
    var src = cdns[name];
    var id = "".concat(name, "DSFE4o431!!");

    if (!pluginHTML) {
      // console.log('configuring plugin:', name);
      // try {
      // 	iframeDoc.body.appendChild(plugin);
      // } catch (err) {
      // 	console.log('Unable to configure plugin', name);
      // }
      console.log('Configured {src}', src);
      loadScriptFromURL(src, iframeDoc, id).then(function () {
        console.log('Script loaded successfully'); // Do something after the script is loaded
      })["catch"](function (error) {
        console.error('Failed to load script:', error);
      });
    }
  } else {
    if (pluginHTML) {
      pluginHTML.remove();
    }
  } // console.log(name, plugins, iframeDoc);

}

function injectHeadContent(plugins, iframeDoc) {
  var tailwindScriptHTML = iframeDoc.getElementById('tailwincssDSFE4o431!!');
  var fontawesomeHTML = iframeDoc.getElementById('fontawesomeDSFE4o431!!');
  var materialiconsHTML = iframeDoc.getElementById('materialiconsDSFE4o431!!');
  var bootstrapHTML = iframeDoc.getElementById('bootstrapDSFE4o431!!');

  if (plugins.fontawesome) {
    // Create a temporary HTML element
    var tempElement = iframeDoc.createElement('div'); // Set the HTML code as text

    tempElement.innerHTML = fontawesomeLINK; // Extract the first child element (the <link> element) from the temporary element

    var fontawesome = tempElement.firstElementChild; // check if it exists

    if (!fontawesomeHTML) {
      iframeDoc.head.appendChild(fontawesome);
    }
  } else {
    if (fontawesomeHTML) {
      fontawesomeHTML.remove();
    }
  }

  if (plugins.bootstrap) {
    // Create a temporary HTML element
    var _tempElement = iframeDoc.createElement('div'); // Set the HTML code as text


    _tempElement.innerHTML = bootstrapLINK; // Extract the first child element (the <link> element) from the temporary element

    var bootstrap = _tempElement.firstElementChild; // check if it exists

    if (!bootstrapHTML) {
      iframeDoc.head.appendChild(bootstrap);
    }
  } else {
    if (bootstrapHTML) {
      bootstrapHTML.remove();
    }
  }

  if (plugins.materialicons) {
    // Create a temporary HTML element
    var _tempElement2 = iframeDoc.createElement('div'); // Set the HTML code as text


    _tempElement2.innerHTML = materialiconsLINK; // Extract the first child element (the <link> element) from the temporary element

    var materialicons = _tempElement2.firstElementChild;
    materialicons.id = 'materialiconsDSFE4o431!!'; // check if it exists

    if (!materialiconsHTML) {
      iframeDoc.head.appendChild(materialicons);
    }
  } else {
    if (materialiconsHTML) {
      materialiconsHTML.remove();
    }
  }

  if (plugins.tailwind) {
    var tailwindScript = iframeDoc.createElement('script');
    tailwindScript.setAttribute('defer');
    tailwindScript.src = 'https://cdn.tailwindcss.com';
    tailwindScript.id = 'tailwincssDSFE4o431!!'; // loadScriptFromURL('https://cdn.tailwindcss.com', iframeDoc, 'tailwincssDSFE4o431!!')
    // 	.then(() => {
    // 		console.log('Script loaded successfully');
    // 		// Do something after the script is loaded
    // 	})
    // 	.catch((error) => {
    // 		console.error('Failed to load script:', error);
    // 	});

    if (!tailwindScriptHTML) {
      iframeDoc.head.appendChild(tailwindScript);
    }
  } else {
    if (tailwindScriptHTML) {
      tailwindScriptHTML.remove();
    }
  }
}

function loadScriptFromURL(url, iframe, id) {
  return new Promise(function (resolve, reject) {
    fetch(url).then(function (response) {
      if (!response.ok) {
        throw new Error('Failed to fetch script');
      }

      return response.text();
    }).then(function (scriptText) {
      var scriptElement = iframe.createElement('script');
      scriptElement.textContent = scriptText;
      scriptElement.id = id;
      scriptElement.onload = resolve;
      scriptElement.onerror = reject;
      iframe.body.appendChild(scriptElement);
    })["catch"](function (error) {
      console.error('Error fetching or loading script:', error);
      reject(error);
    });
  });
}