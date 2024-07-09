import { card } from "~/types/type";
import { firestore } from "../../../utils/firebase"

export default defineEventHandler(async (event) => {
  
  const uid = getCookie(event, 'uid');
  if(!uid) return;

  const deckId = getRouterParam(event, 'id');
  if(!deckId) return;

  const deck = await firestore.collection('decks').doc(deckId).get();
  if(uid != deck.data()?.uid) return;
  
  const name = deck.data()?.name;
  const tags = deck.data()?.tags;
  const owner = deck.data()?.owner;

  const cardsSnapshot = await firestore.collection('decks').doc(deckId).collection('cards').get();
  if (cardsSnapshot.empty) {
    return { name, tags, owner };
  }
  else {
    let cards: card[] = []
    cardsSnapshot.forEach(doc => {
      
      const card = doc.data() as card;
      cards.push(card);
    })

    return { name, tags, owner, cards };
  }
})
