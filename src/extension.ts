// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { fix, LintMdRulesConfig } from '@lint-md/core';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	vscode.languages.registerDocumentFormattingEditProvider('markdown', {
		provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
			const rules: LintMdRulesConfig = vscode.workspace.getConfiguration('lint-md').get('rules')
			const fixed = fix(document.getText(), rules);
			const start = new vscode.Position(0, 0);
			const end = document.lineAt(document.lineCount - 1).range.end;
			return [vscode.TextEdit.replace(new vscode.Range(start, end), fixed)];
		}
	});
}

// this method is called when your extension is deactivated
export function deactivate() { }
