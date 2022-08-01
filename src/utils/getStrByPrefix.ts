import { autocomplete } from 'data/autocomplete';
import { replaceNbsps } from './replaceNbsps';

type getStrByPrefixProps = (prefix: string) => string[];
/**
 * Функция возвращает миссив с завершением строк, соответствующих переданному в нее началу.
 *
 * @example
 * getStrByPrefixProps('To laugh with');
 * return [' you, to joke and enjoy.']
 *
 * @param prefix - Начало стрки, по которой идет поиск для автозаполнения
 * @return - Список вариантов окончания строки, либо пустой массив
 * */
export const getStrByPrefix: getStrByPrefixProps = prefix => {
    return autocomplete
        .filter(item => item.indexOf(replaceNbsps(prefix)) === 0)
        .map(fullText => fullText.slice(prefix.length));
};
