export type personalizedDeck = {
    deckId: String,
    name: String,
    tags: Array<String>
}

export type answer = {
    text: string,
    truth: boolean
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
    id?: string,
    name: string,
    owner: string,
    tags: string[],
    cards?: Array<cardDoc>
}

export type tag = {
    name: string,
    selected: boolean
}