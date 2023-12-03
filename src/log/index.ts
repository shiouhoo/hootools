import * as vscode from 'vscode';

// 所有语言都执行
// 只在用户键入触发字符（例如点或冒号）或手动触发自动完成（例如通过按下 Ctrl+Space）时被调用
export const logDisposable = vscode.languages.registerCompletionItemProvider(
    '*',
    {
        provideCompletionItems(document, position) {
            const linePrefix = document.lineAt(position).text;
            // 获取..前面的单词
            const wordPattern = /[\w.]+/; // Matches words that may include dots
            const wordRange = document.getWordRangeAtPosition(position, wordPattern);
            const word = document.getText(wordRange).slice(0, -2);
            if(!wordRange || !word) {
                return undefined;
            }
            // 不是以..log结尾的，不触发
            if (!linePrefix.endsWith('..log') && !linePrefix.endsWith('..lo') && !linePrefix.endsWith('..l') && !linePrefix.endsWith('..')) {
                return undefined;
            }

            const completionItem = new vscode.CompletionItem('log', vscode.CompletionItemKind.Snippet);
            completionItem.insertText = new vscode.SnippetString(`console.log(\`${word}: ${'\\${' + word + '}'}\`);`);
            completionItem.documentation = new vscode.MarkdownString(`console.log(\`${word}: \${${word}};\`)`);
            completionItem.detail = 'hootools：快捷输出';
            completionItem.tags = [vscode.CompletionItemTag.Deprecated];

            const start = new vscode.Position(position.line, position.character - word.length - 2);
            const end = position;
            const range = new vscode.Range(start, end);

            completionItem.additionalTextEdits = [vscode.TextEdit.delete(range)];
            return [completionItem];
        },
    },
    '.' // triggerCharacters
);
