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

export function getVueSection(document: vscode.TextDocument, position: vscode.Position): string {
    const text = document.getText();
    const offset = document.offsetAt(position);

    const sections = ['template', 'script', 'style'];
    for (const section of sections) {
        const sectionPattern = new RegExp(`<${section}\\b[^>]*>([\\s\\S]*?)<\\/${section}>`, 'gm');
        let match;

        while ((match = sectionPattern.exec(text)) !== null) {
            const sectionStart = match.index;
            const sectionEnd = sectionPattern.lastIndex;

            if (sectionStart <= offset && offset <= sectionEnd) {
                return section;
            }
        }
    }

    return '';
}