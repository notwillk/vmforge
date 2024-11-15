import * as vscode from 'vscode';

import ActivityBarProvider from './providers/ActivityBarWebviewViewProvider';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "vmforge" is now active!');

	const provider = new ActivityBarProvider();

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(ActivityBarProvider.viewType, provider)
	);

	const disposable = vscode.commands.registerCommand('vmforge.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from vmforge!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
