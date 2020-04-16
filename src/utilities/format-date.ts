export function formatDate(date: Date | string): string {
    const d = new Date(date);

    if (d.toString() === 'Invalid Date') return '';

    const day = `${d.getDate()}`,
        month = `${d.getMonth() + 1}`,
        year = `${d.getFullYear()}`;

    return `${month.padStart(2, '0')}/${day.padStart(2, '0')}/${year}`;
}
