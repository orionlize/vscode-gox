// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { openStdin } from 'process';
import * as vscode from 'vscode';

interface Tag {
	label: string
}

const LANGUAGES = ['go']
const ELEMENTS: Tag[] = [
	{
		label: 'a',
	}, 
	{
		label: 'abbr',
	},
	{
		label: 'article',
	},
	{
		label: 'aside',
	},
	{
		label: 'b',
	},
	{
		label: 'br',
	},
	{
		label: 'button',
	},
	{
		label: 'caption',
	},
	{
		label: 'code',
	},
	{
		label: 'div',
	},
	{
		label: 'em',
	},
	{
		label: 'footer',
	},
	{
		label: 'form',
	},
	{
		label: 'h1',
	},
	{
		label: 'h2',
	},
	{
		label: 'h3',
	},
	{
		label: 'h4',
	},
	{
		label: 'h5',
	},
	{
		label: 'h6',
	},
	{
		label: 'header',
	},
	{
		label: 'hr',
	},
	{
		label: 'i',
	},
	{
		label: 'iframe',
	},
	{
		label: 'img',
	},
	{
		label: 'input',
	},
	{
		label: 'label',
	},
	{
		label: 'li',
	},
	{
		label: 'main',
	},
	{
		label: 'nav',
	},
	{
		label: 'option',
	},
	{
		label: 'p',
	},
	{
		label: 'pre',
	},
	{
		label: 'select',
	},
	{
		label: 'span',
	},
	{
		label: 'strike',
	},
	{
		label: 'sup',
	},
	{
		label: 'table',
	},
	{
		label: 'tbody',
	},
	{
		label: 'td',
	},
	{
		label: 'textarea',
	},
	{
		label: 'th',
	},
	{
		label: 'thead',
	},
	{
		label: 'tr',
	},
	{
		label: 'ul',
	},
]

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const completionProvider = vscode.languages.registerCompletionItemProvider(LANGUAGES, {
		async provideCompletionItems(document, position, token, context): Promise<vscode.CompletionItem[]> {
			const range = new vscode.Range(new vscode.Position(position.line, 0), position)
			const text = document.getText(range)
			const lastWord = text.split(' ').slice(-1)[0]
			return ELEMENTS.filter(item => lastWord && lastWord[0] === '<' && item.label.startsWith(lastWord.slice(1))).map(tag => ({
				label: tag.label,
			}))
		},
	}, '')

	context.subscriptions.push(completionProvider);
}


export function deactivate() {}
