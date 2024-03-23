"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateStructuredData = generateStructuredData;

function generateStructuredData() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      title = _ref.title,
      _ref$author = _ref.author,
      author = _ref$author === void 0 ? 'Abdulmumin Yaqeen' : _ref$author,
      _ref$authorUrl = _ref.authorUrl,
      authorUrl = _ref$authorUrl === void 0 ? 'https://yaqeen.me/about' : _ref$authorUrl,
      datePublished = _ref.datePublished,
      description = _ref.description,
      url = _ref.url;

  var scriptT = document.createElement('script');
  scriptT.type = 'application/ld+json';
  var content = "\n\t\n\t{\n\t  \"@context\": \"https://schema.org\",\n\t  \"@type\": \"BlogPosting\",\n\t  \"mainEntityOfPage\": {\n\t\t\"@type\": \"WebPage\",\n\t\t\"@id\": \"".concat(url, "\"\n\t  },\n\t  \"headline\": \"").concat(title, "\",\n\t  \"description\": \"").concat(description, "\",\n\t  \"image\": \"https://devcanvas.art/og?message=").concat(encodeURIComponent(description), "\",  \n\t  \"author\": {\n\t\t\"@type\": \"Organization\",\n\t\t\"name\": \"").concat(author, "\",\n\t\t\"url\": \"").concat(authorUrl, "\"\n\t  },  \n\t  \"publisher\": {\n\t\t\"@type\": \"Organization\",\n\t\t\"name\": \"DevCanvas\",\n\t\t\"logo\": {\n\t\t  \"@type\": \"ImageObject\",\n\t\t  \"url\": \"https://devcanvas.art/logo.svg\"\n\t\t}\n\t  },\n\t  \"datePublished\": \"").concat(datePublished, "\",\n\t  \"dateModified\": \"").concat(datePublished, "\"\n\t}\n            ");
  scriptT.textContent = content;
  return scriptT;
}