import * as vscode from 'vscode';

export function judgeIsTrigger(linePrefix: string, word: string): boolean {
    if(linePrefix.endsWith('..')) {
        return true;
    }
    let c = '';
    for(const char of word) {
        c += char;
        if(linePrefix.endsWith(`..${c}`)) {
            return true;
        }
    }
    return false;
}

export function getWord(document: vscode.TextDocument, position: vscode.Position) {

    // 获取..前面的单词
    const wordPattern = /[\S]+/; // Matches words that may include dots
    const wordRange = document.getWordRangeAtPosition(position, wordPattern);
    let word = document.getText(wordRange);
    word = word.split('..')[0];

    return {
        word,
        wordRange
    };
}

export function getRepalceRange(position: vscode.Position, wordRange: vscode.Range) {
    const start = wordRange.start;
    const end = position;
    const range = new vscode.Range(start, end);
    return range;
}