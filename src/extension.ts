// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import createTemplate, {fileExist}  from './template/index'

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "no" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('remax.createFile', (arg) => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello VS Code from hello1!');
		// console.log(arg)
		init(arg)
	});

	context.subscriptions.push(disposable);

}

// this method is called when your extension is deactivated
export function deactivate() {}


function init(arg:any, value = '') {
	vscode.window.showInputBox({ // 这个对象中所有参数都是可选参数
		password:false, // 输入内容是否是密码
		ignoreFocusOut:true, // 默认false，设置为true时鼠标点击别的地方输入框不会消失
		placeHolder:'请输入文件名', // 在输入框内的提示信息
		prompt:'请输入文件名', // 在输入框下方的提示信息
		value: value,
		// validateInput:function(text){return text;} // 对输入内容进行验证并返回
	}).then(function(msg:string | undefined){
		console.log("用户输入："+msg);
		const path = `${arg.fsPath}/${msg}`
		if(fileExist(path)){
			init(arg, msg)
			return vscode.window.showInformationMessage('文件已存在');
		}

		createTemplate(arg.fsPath, msg || '')
	});
}
