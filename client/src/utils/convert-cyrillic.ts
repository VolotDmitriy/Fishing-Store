const cyrillicToLatinMap: Record<string, string> = {
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'h',
    ґ: 'g',
    д: 'd',
    е: 'e',
    ё: 'e',
    є: 'ye',
    э: 'e',
    ж: 'zh',
    з: 'z',
    и: 'y',
    і: 'i',
    ї: 'yi',
    й: 'y',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    х: 'kh',
    ц: 'ts',
    ч: 'ch',
    ш: 'sh',
    щ: 'shch',
    ь: '',
    ъ: '',
    ы: 'y',
    ю: 'yu',
    я: 'ya',
};

function transliterate(text: string): string {
    return text
        .toLowerCase()
        .split('')
        .map((char) => cyrillicToLatinMap[char] || char)
        .join('');
}

export function slugify(text: string): string {
    return transliterate(text)
        .replace(/\s+/g, '-')
        .replace(/[^a-zA-Z0-9-]/g, '')
        .replace(/-+/g, '-');
}
