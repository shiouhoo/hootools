import * as vscode from 'vscode';
import { getRepalceRange, getVueSection } from '../utils';

function isTriggerOnVue(document: vscode.TextDocument, position: vscode.Position) {
    // 检查文件类型是否为 .vue
    if (document.languageId === 'vue' && document.fileName.endsWith('.vue')) {
        if(getVueSection(document, position) === 'script') {
            return true;
        }else{
            return false;
        }
    }

    return true;
}

// 所有语言都执行
// 只在用户键入触发字符（例如点或冒号）或手动触发自动完成（例如通过按下 Ctrl+Space）时被调用
export const getLogCompletionItems = (document: vscode.TextDocument, position: vscode.Position, word:string, wordRange:vscode.Range): vscode.CompletionItem[] =>{

    if(!isTriggerOnVue(document, position)) {
        return [];
    }

    const completionItem = new vscode.CompletionItem('log(hootools)', vscode.CompletionItemKind.Snippet);
    completionItem.insertText = new vscode.SnippetString(`console.log('${word}: ', ${word});`);
    completionItem.documentation = new vscode.MarkdownString(`console.log('${word}: ', ${word})`);
    completionItem.detail = 'hootools：快捷输出';

    // 覆盖原有输入
    const range = getRepalceRange(position, wordRange);
    completionItem.additionalTextEdits = [vscode.TextEdit.delete(range)];

    return [completionItem];
};