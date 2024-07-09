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
    answers: Array<answer>,
    imgUrl?: String,
}

export type user = {
    name: String,
    profileUrl?: String,
    imgPath?: String, 
}

export type deck = {
    name: String,
    owner: String,
    tags: Array<String>,
    cards?: Array<card>
}

export type tag = {
    name: string,
    selected: boolean
}