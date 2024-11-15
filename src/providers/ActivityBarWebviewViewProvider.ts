import * as vscode from 'vscode';

function getHtml(cspSource: string) {
	return [
		'<!DOCTYPE html>',
			'<html lang="en">',
			'<head>',
				'<meta charset="UTF-8">',
				`<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${cspSource}; script-src 'nonce-${getNonce()}';">`,
				'<meta name="viewport" content="width=device-width, initial-scale=1.0">',
				'<title>VM Forge</title>',
			'</head>',
			'<body>',
				'<h1>VM Forge</h1>',
			'</body>',
			'</html>',
	].join('');
}

export default class ActivityBarWebviewViewProvider implements vscode.WebviewViewProvider {
	public static readonly viewType = 'vmforge.activity-bar-webview';

	public resolveWebviewView(
		webviewView: vscode.WebviewView,
		_context: vscode.WebviewViewResolveContext,
		_token: vscode.CancellationToken,
	) {
		webviewView.webview.html = getHtml(webviewView.webview.cspSource);
	}
}

function getNonce(possible: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') {
	return new Array(32).fill(null).map(() => possible.charAt(Math.floor(Math.random() * possible.length))).join('');
}