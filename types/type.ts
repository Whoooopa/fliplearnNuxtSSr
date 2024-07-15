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
    title: string,
    desc: string,
    question: string,
    answers: Array<answer>,
    imgUrl?: string,
    isQuestion?: boolean,
    img?: any,
    bucketPath?: string
}

export type cardDoc = {
    docId: string,
    card: card
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
    cards?: Array<cardDoc>
}

export type tag = {
    name: string,
    selected: boolean
}