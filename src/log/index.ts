import * as vscode from 'vscode';

// 所有语言都执行
// 只在用户键入触发字符（例如点或冒号）或手动触发自动完成（例如通过按下 Ctrl+Space）时被调用
export const logDisposable = vscode.languages.registerCompletionItemProvider('*',
    {
        provideCompletionItems(document, position) {
            const linePrefix = document.lineAt(position).text;
            if (!linePrefix.endsWith('.log') && !linePrefix.endsWith('.lo') && !linePrefix.endsWith('.l') && !linePrefix.endsWith('.')) {
                return undefined;
            }
            console.log(document.lineAt(position).text);

            // 获取点前面的单词
            const wordRange = document.getWordRangeAtPosition(new vscode.Position(position.line, position.character - 4));
            if (!wordRange) {
                return undefined;
            }
            const word = document.getText(wordRange);

            const completionItem = new vscode.CompletionItem('.log', vscode.CompletionItemKind.Snippet);
            completionItem.insertText = new vscode.SnippetString(`console.log(\`${word}: ${word}\`)`);

            // 删除点前面的单词
            completionItem.documentation = new vscode.MarkdownString(`hootools：快捷输出 console.log(\`${word}: ${word};\`)`);

            return [completionItem];
        },
    },
    '.' // triggerCharacters
);