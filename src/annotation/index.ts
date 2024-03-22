import * as vscode from 'vscode';
import { getRepalceRange, preventTriggerOnVue } from '../utils';

// 所有语言都执行
// 只在用户键入触发字符（例如点或冒号）或手动触发自动完成（例如通过按下 Ctrl+Space）时被调用
export const getAnnotationCompletionItems = (document: vscode.TextDocument, position: vscode.Position, word:string, wordRange:vscode.Range): vscode.CompletionItem[] =>{

    if(!preventTriggerOnVue(document, position)) {
        return [];
    }

    const completionItem = new vscode.CompletionItem('//(hootools)', vscode.CompletionItemKind.Snippet);
    completionItem.insertText = new vscode.SnippetString(`// =================== ${word} ====================`);
    completionItem.documentation = new vscode.MarkdownString(`// =================== ${word} ====================`);
    completionItem.detail = 'hootools：快捷注释';

    // 覆盖原有输入
    const range = getRepalceRange(position, wordRange);
    completionItem.additionalTextEdits = [vscode.TextEdit.delete(range)];

    return [completionItem];
};