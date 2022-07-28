import axios from "axios";

const spellCheckerService = (str: string) => {
    const options = {
        method: "POST",
        url: "https://jspell-checker.p.rapidapi.com/check",
        headers: {
            "content-type": "application/json",
            "X-RapidAPI-Key": "d9996f42d6msh8013b7c53d448dcp1cbe4ejsn62cbb60152ca",
            "X-RapidAPI-Host": "jspell-checker.p.rapidapi.com"
        },
        data: `{"language":"enUS","fieldvalues":"${str}","config":{"forceUpperCase":false,"ignoreIrregularCaps":false,"ignoreFirstCaps":true,"ignoreNumbers":true,"ignoreUpper":false,"ignoreDouble":false,"ignoreWordsWithNumbers":true}}`
    };

    // thiss is intresting
    return axios.request(options);
};

export default spellCheckerService;
