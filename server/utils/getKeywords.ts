function generateKeyWords(name: string) {
    let words = name.split(' ');
    let keywords = [];

    // Generate concatenated substrings across words
    for (let i = 0; i < words.length; i++) {
        let currentCombination = '';
        for (let j = i; j < words.length; j++) {
            for (let k = 1; k <= words[j].length; k++) {
                if (j === i) {
                    keywords.push(currentCombination + words[j].substring(0, k));
                } else {
                    keywords.push(currentCombination + ' ' + words[j].substring(0, k));
                }
            }
            currentCombination += (currentCombination ? ' ' : '') + words[j];
        }
    }

    return keywords;
}

export default generateKeyWords;