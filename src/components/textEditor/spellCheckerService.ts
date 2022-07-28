import axios from 'axios';

const spellCheckerService = (str: string) => {
    const apiKey: string = process.env.REACT_APP_SC_API_KEY as string;
    const options = {
        method: 'POST',
        url: 'https://jspell-checker.p.rapidapi.com/check',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'jspell-checker.p.rapidapi.com'
        },
        data: `{"language":"enUS","fieldvalues":"${str}","config":{"forceUpperCase":false,"ignoreIrregularCaps":false,"ignoreFirstCaps":true,"ignoreNumbers":true,"ignoreUpper":false,"ignoreDouble":false,"ignoreWordsWithNumbers":true}}`
    };

    // thiss is intresting
    return axios.request(options);
};

export default spellCheckerService;
