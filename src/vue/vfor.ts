import * as vscode from 'vscode';
import { getRepalceRange, getVueSection } from '../utils';

export const getVforCompletionItems = (document: vscode.TextDocument, position: vscode.Position, word:string, wordRange:vscode.Range): vscode.CompletionItem[] =>{

    if(getVueSection(document, position) !== 'template') {
        return [];
    }

    const completionItem = new vscode.CompletionItem('vfor(hootools)', vscode.CompletionItemKind.Snippet);
    completionItem.insertText = new vscode.SnippetString(`v-for="(item,index) in ${word}" :key="index"`);
    completionItem.documentation = new vscode.MarkdownString(`v-for="(item,index) in ${word}" :key="index"`);
    completionItem.detail = 'hootools：快捷使用v-for';

    // 覆盖原有输入
    const range = getRepalceRange(position, wordRange);
    completionItem.additionalTextEdits = [vscode.TextEdit.delete(range)];

    return [completionItem];
};