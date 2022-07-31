type replaceNbspsProps = (str: string) => string;

/**
 * Функция заменяет все 'nbsp;' пробелы на обычные.
 * @param str - Строка с пробелами 'nbsp;'
 * @return - Строка с пробелами ' '
 */
export const replaceNbsps: replaceNbspsProps = str => {
    const re = new RegExp(String.fromCharCode(160), 'g');
    return str.replace(re, ' ');
};
