import { tags as t } from '@lezer/highlight';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { EditorView } from '@codemirror/view';

let accentColor = '#7dd3fc';
let backgroundColor = '';
export const createTheme = (accentColor = '#7dd3fc', backgroundColor = '#000') => {
	const base = {
		background: backgroundColor,
		foreground: '#e0e0e0',
		caret: accentColor,
		selection: `${accentColor}40`,
		selectionMatch: `${accentColor}30`,
		lineHighlight: `${accentColor}10`
	};

	const syntax = HighlightStyle.define([
		{ tag: t.comment, color: '#333', fontStyle: 'italic' },
		{ tag: t.variableName, color: '#58ff4d' },
		{ tag: [t.string, t.special(t.brace)], color: '#fc7' },
		{ tag: t.number, color: accentColor },
		{ tag: t.bool, color: accentColor },
		{ tag: t.null, color: accentColor },
		{ tag: t.keyword, color: accentColor },
		{ tag: t.operator, color: '#67f' },
		{ tag: t.className, color: accentColor },
		{ tag: t.definition(t.typeName), color: accentColor },
		{ tag: t.typeName, color: accentColor },
		{ tag: t.angleBracket, color: '#7cf' },
		{ tag: t.tagName, color: accentColor },
		{ tag: t.attributeName, color: '#bb89f7' }
	]);

	const theme = EditorView.theme(
		{
			'&': {
				color: base.foreground,
				backgroundColor: base.background
			},
			'.cm-content': {
				caretColor: base.caret,
				fontFamily: '"Fira Code", monospace'
			},
			'&.cm-focused .cm-cursor': {
				borderLeftColor: base.caret
			},
			'&.cm-focused .cm-selectionBackground, .cm-selectionBackground, ::selection': {
				backgroundColor: base.selection
			},
			'.cm-searchMatch': {
				backgroundColor: base.selectionMatch,
				outline: `1px solid ${base.selection}`
			},
			'.cm-activeLine': { backgroundColor: base.lineHighlight },
			'.cm-gutters': {
				backgroundColor: base.background,
				color: '#666',
				border: 'none'
			},
			'.cm-activeLineGutter': {
				backgroundColor: base.lineHighlight
			},
			'.cm-scroller': {
				fontFamily: '"Fira Code", monospace'
			}
		},
		{ dark: true }
	);

	return [theme, syntaxHighlighting(syntax)];
};
