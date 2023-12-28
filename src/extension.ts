import * as vscode from 'vscode';
import { getLogCompletionItems } from './log';
import { getWord, judgeIsTrigger } from './utils';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    console.log(' your extension "hootools" is now active!');

    const disposable = vscode.languages.registerCompletionItemProvider(
        { pattern: '**' },
        {
            provideCompletionItems(document, position) {
                const linePrefix = document.lineAt(position).text;

                // 获取..前面的单词
                const { word, wordRange } = getWord(document, position);
                if(!wordRange || !word) {
                    return [];
                }

                const logCompionItems = judgeIsTrigger(linePrefix, 'log') ? getLogCompletionItems(document, position, word, wordRange) : [];
                return [...logCompionItems];
            }
        },
        '.' // triggered whenever a '.' is being typed
    );

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
