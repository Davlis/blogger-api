export function getTf(word, words) {
    return count(words, word)/words.length
}

export function getIdf(word, documents, contentProperty) {
    const documentLength = documents.length
    let i = 0

    for (const document of documents) {
        const words = normalizeWords(getWords(document[contentProperty]))

        if (words.includes(word)) {
            ++i
        }
    }

    return Math.log(documentLength/i)
}

export function count(array, word) {
    let i = 0
    for (const item of array) {
        if (item === word) {
            ++i
        }
    }
    return i
}

export function getWords(content) {
    return content.split(/[ ,.;:?!@#$%^&*()]+/).filter(Boolean)
}

export function normalizeWords(words) {
    return words.map(w => w.toLowerCase())
}
