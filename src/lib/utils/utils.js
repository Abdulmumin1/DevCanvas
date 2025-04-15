export function formatDate(date, dateStyle = 'medium', locales = 'en') {
	const formatter = new Intl.DateTimeFormat(locales, { dateStyle });
	return formatter.format(new Date(date));
}

export function insertCopyButton(icon) {
	let pre = document.querySelectorAll('pre');
	pre.forEach((element) => {
		let div = document.createElement('div');
		div.classList = 'w-full flex items-center justify-end bg-sky-200 text-primary rounded-t-2xl';
		div.style.marginBottom = '-23px';
		let copyButton = document.createElement('button');
		copyButton.innerText = 'copy';
		copyButton.classList = ' px-4 py-1 rounded-t-lg  w-fit z-9999';
		copyButton.onclick = () => {
			copyUrlToClipboard(element.lastElementChild.innerText);
			copyButton.innerText = 'copied';
			setTimeout(() => {
				copyButton.innerText = 'copy';
			}, 2000);
		};
		div.appendChild(copyButton);
		element.classList.add('relative');
		element.insertAdjacentElement('beforebegin', div);
	});
}

export function copyUrlToClipboard(url) {
	navigator.clipboard
		.writeText(url)
		.then(() => {
			// console.log('URL copied to clipboard:', url);
		})
		.catch((error) => {
			console.error('Failed to copy URL to clipboard:', error);
		});
}

export let rulesOld = [
	{
		token: 'comment',
		foreground: '#5c6370' // Comment color
	},

	{
		token: 'keyword',
		foreground: '#c678dd' // Keyword color
	},
	{
		token: 'tag',
		foreground: '#e06c75' // HTML tag color
	},
	{
		token: 'attribute.name',
		foreground: '#abb2bf' // HTML attribute name color
	},
	{
		token: 'attribute.value',
		foreground: '#36A0D8' // HTML attribute value color
	},
	{
		token: 'string',
		foreground: '#aad94c'
	},
	{
		token: 'constant.numeric',
		foreground: '#d2a6ff'
	},
	{
		token: 'variable.parameter.function-call',
		foreground: '#bfbdb6'
	},
	{
		token: 'variable',
		foreground: '#bfbdb6'
	},
	{
		token: 'variable.member',
		foreground: '#f07178'
	},
	{
		token: 'keyword',
		foreground: '#ff8f40'
	},
	{
		token: 'keyword.operator',
		foreground: '#f29668'
	},
	{
		token: 'punctuation.separator',
		foreground: '#bfbdb6b3'
	},
	{
		token: 'punctuation.terminator',
		foreground: '#bfbdb6b3'
	},
	{
		token: 'punctuation.definition.template-expression',
		foreground: '#ff8f40'
	},
	{
		token: 'entity.other.inherited-class',
		foreground: '#39bae6'
	},
	{
		token: 'storage.type.function',
		foreground: '#ff8f40'
	},
	{
		token: 'variable.function',
		foreground: '#ffb454'
	},
	{
		token: 'variable.annotation',
		foreground: '#ffb454'
	},
	{
		token: 'variable.function',
		foreground: '#ffb454'
	},
	{
		token: 'entity.name.function',
		foreground: '#ffb454'
	},
	{
		token: 'variable.parameter',
		foreground: '#d2a6ff'
	},
	{
		token: 'meta.parameter',
		foreground: '#d2a6ff'
	}
];

export let ayuDarkRules = [
	{
		token: 'comment',
		foreground: '#acb6bf8c'
	},
	{
		token: 'string',
		foreground: '#aad94c'
	},
	{
		token: 'constant.other.symbol',
		foreground: '#aad94c'
	},
	{
		token: 'string.regexp',
		foreground: '#95e6cb'
	},
	{
		token: 'constant.character',
		foreground: '#95e6cb'
	},
	{
		token: 'constant.other',
		foreground: '#95e6cb'
	},
	{
		token: 'constant.numeric',
		foreground: '#d2a6ff'
	},
	{
		token: 'constant.language',
		foreground: '#d2a6ff'
	},
	{
		token: 'variable',
		foreground: '#bfbdb6'
	},
	{
		token: 'variable.parameter.function-call',
		foreground: '#bfbdb6'
	},
	{
		token: 'variable.member',
		foreground: '#f07178'
	},
	{
		token: 'variable.language',
		foreground: '#39bae6'
	},
	{
		token: 'storage',
		foreground: '#ff8f40'
	},
	{
		token: 'keyword',
		foreground: '#ff8f40'
	},
	{
		token: 'keyword.operator',
		foreground: '#f29668'
	},
	{
		token: 'punctuation.separator',
		foreground: '#bfbdb6b3'
	},
	{
		token: 'punctuation.terminator',
		foreground: '#bfbdb6b3'
	},
	{
		token: 'punctuation.section',
		foreground: '#bfbdb6'
	},
	{
		token: 'punctuation.accessor',
		foreground: '#f29668'
	},
	{
		token: 'punctuation.definition.template-expression',
		foreground: '#ff8f40'
	},
	{
		token: 'punctuation.section.embedded',
		foreground: '#ff8f40'
	},
	{
		token: 'meta.embedded',
		foreground: '#bfbdb6'
	},
	{
		token: 'source.java storage.type',
		foreground: '#59c2ff'
	},
	{
		token: 'source.haskell storage.type',
		foreground: '#59c2ff'
	},
	{
		token: 'source.c storage.type',
		foreground: '#59c2ff'
	},
	{
		token: 'entity.other.inherited-class',
		foreground: '#39bae6'
	},
	{
		token: 'storage.type.function',
		foreground: '#ff8f40'
	},
	{
		token: 'source.java storage.type.primitive',
		foreground: '#39bae6'
	},
	{
		token: 'entity.name.function',
		foreground: '#ffb454'
	},
	{
		token: 'variable.parameter',
		foreground: '#d2a6ff'
	},
	{
		token: 'meta.parameter',
		foreground: '#d2a6ff'
	},
	{
		token: 'variable.function',
		foreground: '#ffb454'
	},
	{
		token: 'variable.annotation',
		foreground: '#ffb454'
	},
	{
		token: 'meta.function-call.generic',
		foreground: '#ffb454'
	},
	{
		token: 'support.function.go',
		foreground: '#ffb454'
	},
	{
		token: 'support.function',
		foreground: '#f07178'
	},
	{
		token: 'support.macro',
		foreground: '#f07178'
	},
	{
		token: 'entity.name.import',
		foreground: '#aad94c'
	},
	{
		token: 'entity.name.package',
		foreground: '#aad94c'
	},
	{
		token: 'entity.name',
		foreground: '#59c2ff'
	},
	{
		token: 'entity.name.tag',
		foreground: '#39bae6'
	},
	{
		token: 'meta.tag.sgml',
		foreground: '#39bae6'
	},
	{
		token: 'support.class.component',
		foreground: '#59c2ff'
	},
	{
		token: 'punctuation.definition.tag.end',
		foreground: '#39bae680'
	},
	{
		token: 'punctuation.definition.tag.begin',
		foreground: '#39bae680'
	},
	{
		token: 'punctuation.definition.tag',
		foreground: '#39bae680'
	},
	{
		token: 'entity.other.attribute-name',
		foreground: '#ffb454'
	},
	{
		token: 'support.constant',
		foreground: '#f29668'
	},
	{
		token: 'support.type',
		foreground: '#39bae6'
	},
	{
		token: 'support.class',
		foreground: '#39bae6'
	},
	{
		token: 'source.go storage.type',
		foreground: '#39bae6'
	},
	{
		token: 'meta.decorator variable.other',
		foreground: '#e6b673'
	},
	{
		token: 'meta.decorator punctuation.decorator',
		foreground: '#e6b673'
	},
	{
		token: 'storage.type.annotation',
		foreground: '#e6b673'
	},
	{
		token: 'invalid',
		foreground: '#d95757'
	},
	{
		token: 'meta.diff',
		foreground: '#c594c5'
	},
	{
		token: 'meta.diff.header',
		foreground: '#c594c5'
	},
	{
		token: 'source.ruby variable.other.readwrite',
		foreground: '#ffb454'
	},
	{
		token: 'source.css entity.name.tag',
		foreground: '#59c2ff'
	},
	{
		token: 'source.sass entity.name.tag',
		foreground: '#59c2ff'
	},
	{
		token: 'source.scss entity.name.tag',
		foreground: '#59c2ff'
	},
	{
		token: 'source.less entity.name.tag',
		foreground: '#59c2ff'
	},
	{
		token: 'source.stylus entity.name.tag',
		foreground: '#59c2ff'
	},
	{
		token: 'source.css support.type',
		foreground: '#acb6bf8c'
	},
	{
		token: 'source.sass support.type',
		foreground: '#acb6bf8c'
	},
	{
		token: 'source.scss support.type',
		foreground: '#acb6bf8c'
	},
	{
		token: 'source.less support.type',
		foreground: '#acb6bf8c'
	},
	{
		token: 'source.stylus support.type',
		foreground: '#acb6bf8c'
	},
	{
		token: 'support.type.property-name',
		foreground: '#39bae6'
	},
	{
		token: 'constant.numeric.line-number.find-in-files - match',
		foreground: '#acb6bf8c'
	},
	{
		token: 'constant.numeric.line-number.match',
		foreground: '#ff8f40'
	},
	{
		token: 'entity.name.filename.find-in-files',
		foreground: '#aad94c'
	},
	{
		token: 'message.error',
		foreground: '#d95757'
	},
	{
		token: 'markup.heading',
		foreground: '#aad94c'
	},
	{
		token: 'markup.heading entity.name',
		foreground: '#aad94c'
	},
	{
		token: 'markup.underline.link',
		foreground: '#39bae6'
	},
	{
		token: 'string.other.link',
		foreground: '#39bae6'
	},
	{
		token: 'markup.italic',
		foreground: '#f07178'
	},
	{
		token: 'markup.bold',
		foreground: '#f07178'
	},
	{
		token: 'markup.italic markup.bold',
		foreground: null
	},
	{
		token: 'markup.bold markup.italic',
		foreground: null
	},
	{
		token: 'markup.raw',
		foreground: null
	},
	{
		token: 'markup.raw.inline',
		foreground: null
	},
	{
		token: 'meta.separator',
		foreground: '#acb6bf8c'
	},
	{
		token: 'markup.quote',
		foreground: '#95e6cb'
	},
	{
		token: 'markup.list punctuation.definition.list.begin',
		foreground: '#ffb454'
	},
	{
		token: 'markup.inserted',
		foreground: '#7fd962'
	},
	{
		token: 'markup.changed',
		foreground: '#73b8ff'
	},
	{
		token: 'markup.deleted',
		foreground: '#f26d78'
	},
	{
		token: 'markup.strike',
		foreground: '#e6b673'
	},
	{
		token: 'markup.table',
		foreground: '#39bae6'
	},
	{
		token: 'text.html.markdown markup.inline.raw',
		foreground: '#f29668'
	},
	{
		token: 'text.html.markdown meta.dummy.line-break',
		foreground: '#acb6bf8c'
	},
	{
		token: 'punctuation.definition.markdown',
		foreground: '#acb6bf8c'
	},

	{
		token: 'tag',
		foreground: '#ff8f40' // HTML tag color
	},
	{
		token: 'attribute.name',
		foreground: '#abb2bf' // HTML attribute name color
	},
	{
		token: 'attribute.value',
		foreground: '#36A0D8' // HTML attribute value color
	}
];

export let currentTheme = {
	base: 'vs-dark',
	inherit: true,
	colors: {
		focusBorder: '#e6b450b3',
		foreground: '#565b66',
		'widget.shadow': '#00000080',
		'selection.background': '#409fff4d',
		'icon.foreground': '#565b66',
		errorForeground: '#d95757',
		descriptionForeground: '#565b66',
		'textBlockQuote.background': '#0f131a',
		'textLink.foreground': '#e6b450',
		'textLink.activeForeground': '#e6b450',
		'textPreformat.foreground': '#bfbdb6',
		'button.background': '#e6b450',
		'button.foreground': '#734d00',
		'button.hoverBackground': '#e1af4b',
		'button.secondaryBackground': '#565b6633',
		'button.secondaryForeground': '#bfbdb6',
		'button.secondaryHoverBackground': '#565b6680',
		'dropdown.background': '#0d1017',
		'dropdown.foreground': '#565b66',
		'dropdown.border': '#565b6645',
		'input.background': '#0d1017',
		'input.border': '#565b6645',
		'input.foreground': '#bfbdb6',
		'input.placeholderForeground': '#565b6680',
		'inputOption.activeBorder': '#e6b4504d',
		'inputOption.activeBackground': '#e6b45033',
		'inputOption.activeForeground': '#e6b450',
		'inputValidation.errorBackground': '#0d1017',
		'inputValidation.errorBorder': '#d95757',
		'inputValidation.infoBackground': '#0b0e14',
		'inputValidation.infoBorder': '#39bae6',
		'inputValidation.warningBackground': '#0b0e14',
		'inputValidation.warningBorder': '#ffb454',
		'scrollbar.shadow': '#1e232b00',
		'scrollbarSlider.background': '#565b6666',
		'scrollbarSlider.hoverBackground': '#565b6699',
		'scrollbarSlider.activeBackground': '#565b66b3',
		'badge.background': '#e6b45033',
		'badge.foreground': '#e6b450',
		'progressBar.background': '#e6b450',
		'list.activeSelectionBackground': '#47526640',
		'list.activeSelectionForeground': '#bfbdb6',
		'list.focusBackground': '#47526640',
		'list.focusForeground': '#bfbdb6',
		'list.focusOutline': '#47526640',
		'list.highlightForeground': '#e6b450',
		'list.deemphasizedForeground': '#d95757',
		'list.hoverBackground': '#47526640',
		'list.inactiveSelectionBackground': '#47526633',
		'list.inactiveSelectionForeground': '#565b66',
		'list.invalidItemForeground': '#565b664d',
		'list.errorForeground': '#d95757',
		'tree.indentGuidesStroke': '#6c738080',
		'listFilterWidget.background': '#0f131a',
		'listFilterWidget.outline': '#e6b450',
		'listFilterWidget.noMatchesOutline': '#d95757',
		'list.filterMatchBackground': '#5f4c7266',
		'list.filterMatchBorder': '#6c598066',
		'activityBar.background': '#0b0e14',
		'activityBar.foreground': '#565b66cc',
		'activityBar.inactiveForeground': '#565b6699',
		'activityBar.border': '#0b0e14',
		'activityBar.activeBorder': '#e6b450',
		'activityBarBadge.background': '#e6b450',
		'activityBarBadge.foreground': '#734d00',
		'sideBar.background': '#0b0e14',
		'sideBar.border': '#0b0e14',
		'sideBarTitle.foreground': '#565b66',
		'sideBarSectionHeader.background': '#0b0e14',
		'sideBarSectionHeader.foreground': '#565b66',
		'sideBarSectionHeader.border': '#0b0e14',
		'minimap.background': '#0b0e14',
		'minimap.selectionHighlight': '#409fff4d',
		'minimap.errorHighlight': '#d95757',
		'minimap.findMatchHighlight': '#6c5980',
		'minimapGutter.addedBackground': '#7fd962',
		'minimapGutter.modifiedBackground': '#73b8ff',
		'minimapGutter.deletedBackground': '#f26d78',
		'editorGroup.border': '#1e232b',
		'editorGroup.background': '#0f131a',
		'editorGroupHeader.noTabsBackground': '#0b0e14',
		'editorGroupHeader.tabsBackground': '#0b0e14',
		'editorGroupHeader.tabsBorder': '#0b0e14',
		'tab.activeBackground': '#0b0e14',
		'tab.activeForeground': '#bfbdb6',
		'tab.border': '#0b0e14',
		'tab.activeBorder': '#e6b450',
		'tab.unfocusedActiveBorder': '#565b66',
		'tab.inactiveBackground': '#0b0e14',
		'tab.inactiveForeground': '#565b66',
		'tab.unfocusedActiveForeground': '#565b66',
		'tab.unfocusedInactiveForeground': '#565b66',
		'editor.background': '#0b0e14',
		'editor.foreground': '#bfbdb6',
		'editorLineNumber.foreground': '#6c738099',
		'editorLineNumber.activeForeground': '#6c7380e6',
		'editorCursor.foreground': '#e6b450',
		'editor.inactiveSelectionBackground': '#409fff21',
		'editor.selectionBackground': '#409fff4d',
		'editor.selectionHighlightBackground': '#7fd96226',
		'editor.selectionHighlightBorder': '#7fd96200',
		'editor.wordHighlightBackground': '#73b8ff14',
		'editor.wordHighlightStrongBackground': '#7fd96214',
		'editor.wordHighlightBorder': '#73b8ff80',
		'editor.wordHighlightStrongBorder': '#7fd96280',
		'editor.findMatchBackground': '#6c5980',
		'editor.findMatchBorder': '#6c5980',
		'editor.findMatchHighlightBackground': '#6c598066',
		'editor.findMatchHighlightBorder': '#5f4c7266',
		'editor.findRangeHighlightBackground': '#6c598040',
		'editor.rangeHighlightBackground': '#6c598033',
		'editor.lineHighlightBackground': '#131721',
		'editorLink.activeForeground': '#e6b450',
		'editorWhitespace.foreground': '#6c738099',
		'editorIndentGuide.background': '#6c738033',
		'editorIndentGuide.activeBackground': '#6c738080',
		'editorRuler.foreground': '#6c738033',
		'editorCodeLens.foreground': '#acb6bf8c',
		'editorBracketMatch.background': '#6c73804d',
		'editorBracketMatch.border': '#6c73804d',
		'editor.snippetTabstopHighlightBackground': '#7fd96233',
		'editorOverviewRuler.border': '#1e232b',
		'editorOverviewRuler.modifiedForeground': '#73b8ff',
		'editorOverviewRuler.addedForeground': '#7fd962',
		'editorOverviewRuler.deletedForeground': '#f26d78',
		'editorOverviewRuler.errorForeground': '#d95757',
		'editorOverviewRuler.warningForeground': '#e6b450',
		'editorOverviewRuler.bracketMatchForeground': '#6c7380b3',
		'editorOverviewRuler.wordHighlightForeground': '#73b8ff66',
		'editorOverviewRuler.wordHighlightStrongForeground': '#7fd96266',
		'editorOverviewRuler.findMatchForeground': '#6c5980',
		'editorError.foreground': '#d95757',
		'editorWarning.foreground': '#e6b450',
		'editorGutter.modifiedBackground': '#73b8ffcc',
		'editorGutter.addedBackground': '#7fd962cc',
		'editorGutter.deletedBackground': '#f26d78cc',
		'diffEditor.insertedTextBackground': '#7fd9621f',
		'diffEditor.removedTextBackground': '#f26d781f',
		'diffEditor.diagonalFill': '#1e232b',
		'editorWidget.background': '#0f131a',
		'editorWidget.border': '#1e232b',
		'editorHoverWidget.background': '#0f131a',
		'editorHoverWidget.border': '#1e232b',
		'editorSuggestWidget.background': '#0f131a',
		'editorSuggestWidget.border': '#1e232b',
		'editorSuggestWidget.highlightForeground': '#e6b450',
		'editorSuggestWidget.selectedBackground': '#47526640',
		'debugExceptionWidget.border': '#1e232b',
		'debugExceptionWidget.background': '#0f131a',
		'editorMarkerNavigation.background': '#0f131a',
		'peekView.border': '#47526640',
		'peekViewTitle.background': '#47526640',
		'peekViewTitleDescription.foreground': '#565b66',
		'peekViewTitleLabel.foreground': '#bfbdb6',
		'peekViewEditor.background': '#0f131a',
		'peekViewEditor.matchHighlightBackground': '#6c598066',
		'peekViewEditor.matchHighlightBorder': '#5f4c7266',
		'peekViewResult.background': '#0f131a',
		'peekViewResult.fileForeground': '#bfbdb6',
		'peekViewResult.lineForeground': '#565b66',
		'peekViewResult.matchHighlightBackground': '#6c598066',
		'peekViewResult.selectionBackground': '#47526640',
		'panel.background': '#0b0e14',
		'panel.border': '#1e232b',
		'panelTitle.activeBorder': '#e6b450',
		'panelTitle.activeForeground': '#bfbdb6',
		'panelTitle.inactiveForeground': '#565b66',
		'statusBar.background': '#0b0e14',
		'statusBar.foreground': '#565b66',
		'statusBar.border': '#0b0e14',
		'statusBar.debuggingBackground': '#f29668',
		'statusBar.debuggingForeground': '#0d1017',
		'statusBar.noFolderBackground': '#0f131a',
		'statusBarItem.activeBackground': '#565b6633',
		'statusBarItem.hoverBackground': '#565b6633',
		'statusBarItem.prominentBackground': '#1e232b',
		'statusBarItem.prominentHoverBackground': '#00000030',
		'statusBarItem.remoteBackground': '#e6b450',
		'statusBarItem.remoteForeground': '#734d00',
		'titleBar.activeBackground': '#0b0e14',
		'titleBar.activeForeground': '#bfbdb6',
		'titleBar.inactiveBackground': '#0b0e14',
		'titleBar.inactiveForeground': '#565b66',
		'titleBar.border': '#0b0e14',
		'extensionButton.prominentForeground': '#734d00',
		'extensionButton.prominentBackground': '#e6b450',
		'extensionButton.prominentHoverBackground': '#e1af4b',
		'pickerGroup.border': '#1e232b',
		'pickerGroup.foreground': '#565b6680',
		'debugToolBar.background': '#0f131a',
		'debugIcon.breakpointForeground': '#f29668',
		'debugIcon.breakpointDisabledForeground': '#f2966880',
		'debugConsoleInputIcon.foreground': '#e6b450',
		'welcomePage.tileBackground': '#0b0e14',
		'welcomePage.tileShadow': '#00000080',
		'welcomePage.progress.background': '#131721',
		'welcomePage.buttonBackground': '#e6b45066',
		'walkThrough.embeddedEditorBackground': '#0f131a',
		'gitDecoration.modifiedResourceForeground': '#73b8ffb3',
		'gitDecoration.deletedResourceForeground': '#f26d78b3',
		'gitDecoration.untrackedResourceForeground': '#7fd962b3',
		'gitDecoration.ignoredResourceForeground': '#565b6680',
		'gitDecoration.conflictingResourceForeground': '',
		'gitDecoration.submoduleResourceForeground': '#d2a6ffb3',
		'settings.headerForeground': '#bfbdb6',
		'settings.modifiedItemIndicator': '#73b8ff',
		'keybindingLabel.background': '#565b661a',
		'keybindingLabel.foreground': '#bfbdb6',
		'keybindingLabel.border': '#bfbdb61a',
		'keybindingLabel.bottomBorder': '#bfbdb61a',
		'terminal.background': '#0b0e14',
		'terminal.foreground': '#bfbdb6',
		'terminal.ansiBlack': '#1e232b',
		'terminal.ansiRed': '#ea6c73',
		'terminal.ansiGreen': '#7fd962',
		'terminal.ansiYellow': '#f9af4f',
		'terminal.ansiBlue': '#53bdfa',
		'terminal.ansiMagenta': '#cda1fa',
		'terminal.ansiCyan': '#90e1c6',
		'terminal.ansiWhite': '#c7c7c7',
		'terminal.ansiBrightBlack': '#686868',
		'terminal.ansiBrightRed': '#f07178',
		'terminal.ansiBrightGreen': '#aad94c',
		'terminal.ansiBrightYellow': '#ffb454',
		'terminal.ansiBrightBlue': '#59c2ff',
		'terminal.ansiBrightMagenta': '#d2a6ff',
		'terminal.ansiBrightCyan': '#95e6cb',
		'terminal.ansiBrightWhite': '#ffffff'
	},
	rules: ayuDarkRules,

	semanticHighlighting: true,
	semanticTokenColors: {
		'parameter.label': '#bfbdb6'
	}
};
