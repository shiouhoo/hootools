import * as vscode from 'vscode';
import { logDisposable } from './log';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    console.log('Congratulations, your extension "hootools" is now active!');

    // 将命令放入其上下文对象中，使其生效
    context.subscriptions.push(logDisposable);

}

// This method is called when your extension is deactivated
export function deactivate() {}
