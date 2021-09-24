const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	let disposable = vscode.commands.registerCommand('html-split.splitFile', async function () {

		// get the active editor
		let targetEditor = vscode.window.activeTextEditor;
		if (!targetEditor) {
			return; // no open text editor
		}

		// if current file is not an html file, return and show an error message
		if (targetEditor.document.languageId !== 'html') {
			vscode.window.showErrorMessage('The target file is not an html file.');
			return;
		}

		// get the active editor's contents
		let htmlText = targetEditor.document.getText();

		// if the text is empty, return and show an error message
		if (htmlText.length === 0) {
			vscode.window.showErrorMessage('The target file is empty.');
			return;
		}
		
		// if the text contains <style> and </style>,
		// extract the text between the tags
		// then remove the tags and their contents from the text
		let cssText = '';
		let cssStart = htmlText.indexOf('<style');
		let cssEnd = htmlText.indexOf('</style>');
		if (cssStart !== -1 && cssEnd !== -1) {
			cssText = htmlText.substring(cssStart + 7, cssEnd);
			htmlText = htmlText.substring(0, cssStart) + htmlText.substring(cssEnd + 8);
			// insert a <link> tag for the css file into the html
			// just before the </head> tag
			let headEnd = htmlText.indexOf('</head>');
			if (headEnd !== -1) {
				htmlText = htmlText.substring(0, headEnd) + '\t<link rel="stylesheet" href="style.css">\n' + htmlText.substring(headEnd);
			}
		}

		// if the text contains <script> and </script>,
		// extract the text between the tags
		// then remove the tags and their contents from the text
		let jsText = '';
		let jsStart = htmlText.indexOf('<script');
		let jsEnd = htmlText.indexOf('</script>');
		if (jsStart !== -1 && jsEnd !== -1) {
			jsText = htmlText.substring(jsStart + 8, jsEnd);
			htmlText = htmlText.substring(0, jsStart) + htmlText.substring(jsEnd + 9);
			// insert a <script> tag for the js file into the html
			// just before the </body> tag
			let bodyEnd = htmlText.indexOf('</body>');
			if (bodyEnd !== -1) {
				htmlText = htmlText.substring(0, bodyEnd) + '\t<script src="script.js"></script>\n' + htmlText.substring(bodyEnd);
			}
		}

		// remove the empty lines from the html
		htmlText = htmlText.replace(/^\s*[\r\n]/gm, '');

		// open a new file containing the css
		if (cssText.length > 0) {
			let cssEditor = await vscode.workspace.openTextDocument({ content: cssText, language: 'css' });
			await vscode.window.showTextDocument(cssEditor, { preview: false });
			// run the default formatter for the css file
			await vscode.commands.executeCommand('editor.action.format');
		}

		// open a new file containing the js
		if (jsText.length > 0) {
			let jsEditor = await vscode.workspace.openTextDocument({ content: jsText, language: 'javascript' });
			await vscode.window.showTextDocument(jsEditor, { preview: false });
			// run the default formatter for the js file
			await vscode.commands.executeCommand('editor.action.format');
		}

		// open a new file containing the html
		let htmlEditor = await vscode.workspace.openTextDocument({ content: htmlText, language: 'html' });
		await vscode.window.showTextDocument(htmlEditor, { preview: false });
		// run the default formatter for the html file
		await vscode.commands.executeCommand('editor.action.format');

		// show a success message
		vscode.window.showInformationMessage('Target HTML file split into HTML, CSS, and JS files!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
