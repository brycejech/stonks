const specials = [
    // order matters
    '-',
    '[',
    ']',
    // order doesn't matter
    '/',
    '{',
    '}',
    '(',
    ')',
    '*',
    '+',
    '?',
    '.',
    '\\',
    '^',
    '$',
    '|',
];

const exp = new RegExp('[' + specials.join('\\') + ']', 'g');

export function escapeRegex(pattern: string): string {
    return pattern.replace(exp, '\\$&');
}
