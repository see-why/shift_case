// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('shift-case.toggleCase', async () => {
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const document = editor.document;
			return editor.edit(editBuilder => {
				for (const selection of editor.selections) {
					const text = document.getText(selection);
					if (text.length === 0) { continue; }
					const newText = text === text.toUpperCase()
						? text.toLowerCase()
						: text.toUpperCase();
					editBuilder.replace(selection, newText);
				}
			});
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
