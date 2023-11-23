// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import fs from 'fs';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "hootools" is now active!');

    // 注册命令
    const commandOfGetFileState = vscode.commands.registerCommand('getFileState', uri => {
        // 文件路径
        const filePath = uri.path.substring(1);
        fs.stat(filePath, (err, stats) => {
            if (err) {
                vscode.window.showErrorMessage(`获取文件时遇到错误了${err}!!!`);
            }

            if (stats.isDirectory()) {
                vscode.window.showWarningMessage(`检测的是文件夹，不是文件，请重新选择！！！`);
            }

            if (stats.isFile()) {
                const size = stats.size;
                const createTime = stats.birthtime.toLocaleString();
                const modifyTime = stats.mtime.toLocaleString();

                vscode.window.showInformationMessage(`
					文件大小为:${size}字节;
					文件创建时间为:${createTime};
					文件修改时间为:${modifyTime}
				`, { modal: true });
            }
        });

        const stats = fs.statSync(filePath);
        console.log('stats', stats);
        console.log('isFile', stats.isFile());
    });

    // 将命令放入其上下文对象中，使其生效
    context.subscriptions.push(commandOfGetFileState);

}

// This method is called when your extension is deactivated
export function deactivate() {}
