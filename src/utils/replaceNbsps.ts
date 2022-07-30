/** Функция заменяет все &nbsp; пробелы на обычные */

type replaceNbspsProps = (str: string) => string;
export const replaceNbsps: replaceNbspsProps = str => {
    const re = new RegExp(String.fromCharCode(160), 'g');
    return str.replace(re, ' ');
};
