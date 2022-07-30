/**
 * Функция возвращает миссив с завершением строк, соответствующих переданному в нее началу.
 * Например "To laugh with" вернет [" you, to joke and enjoy."]
 * */

import { autocomplete } from '../data/autocomplete';
import {replaceNbsps} from './replaceNbsps';

type getStrByPrefixProps = (prefix: string) => string[];
export const getStrByPrefix: getStrByPrefixProps = prefix => {
    return autocomplete
        .filter(item => item.indexOf(replaceNbsps(prefix)) === 0)
        .map(fullText => fullText.slice(prefix.length));
};
