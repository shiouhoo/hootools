import * as vscode from 'vscode';
import { getLogCompletionItems } from './log';
import { getVforCompletionItems } from './vue/vfor';
import { judgeIsTrigger } from './utils';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    const disposable = vscode.languages.registerCompletionItemProvider(
        { pattern: '**' },
        {
            provideCompletionItems(document, position) {
                const line = document.lineAt(position).text;
                const linePrefix = line.slice(0, position.character);

                // 查找最后一个非连续字符
                const lastNonContinuousCharIndex = linePrefix.search(/\S*$/);
                const start = new vscode.Position(position.line, lastNonContinuousCharIndex);
                const end = position;
                /** 不包含..的连续字符串 */
                const word = linePrefix.slice(lastNonContinuousCharIndex).split('..')[0];
                const wordRange = new vscode.Range(start, end);
                /** 包含..的连续字符串 */
                const fullWord = linePrefix.slice(lastNonContinuousCharIndex);
                if(fullWord === '..') {
                    return;
                }
                const logCompionItems = judgeIsTrigger(fullWord, 'log') ? getLogCompletionItems(document, position, word, wordRange) : [];
                const vforCompionItems = judgeIsTrigger(fullWord, 'vfor') ? getVforCompletionItems(document, position, word, wordRange) : [];
                return [...logCompionItems, ...vforCompionItems];
            }
        },
        '.' // triggered whenever a '.' is being typed
    );

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
