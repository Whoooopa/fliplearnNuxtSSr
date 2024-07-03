export type personalizedDeck = {
    deckId: String,
    name: String,
    tags: Array<String>
}

export type answer = {
    text: String,
    truth: Boolean
}

export type card = {  
    title: String,
    desc: String,
    question: String,
    answers: Array<answer>
}