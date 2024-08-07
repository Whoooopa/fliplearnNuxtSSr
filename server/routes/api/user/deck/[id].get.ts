import { card, cardDoc } from "~/types/type";
import { firestore } from "../../../../utils/firebase"

export default defineEventHandler(async (event) => {
  
  const uid = getCookie(event, 'uid');
  if(!uid) return;

  const deckId = getRouterParam(event, 'id');
  if(!deckId) return;

  const deck = await firestore.collection('decks').doc(deckId).get();
  
  const name = deck.data()?.name;
  const tagsMap = deck.data()?.tags;
  const owner = deck.data()?.owner;

  let tags: string[] = [];
  tags = Object.keys(tagsMap).filter(tag => tagsMap[tag]);

  const cardsSnapshot = await firestore.collection('decks').doc(deckId).collection('cards').get();
  if (cardsSnapshot.empty) {
    return { name, tags, owner };
  }
  else {
    let cards: cardDoc[] = []
    cardsSnapshot.forEach(doc => {
      
      const cardData = doc.data() as card;
      const card: card = {
        ...cardData, 
        isQuestion: false
      };
      const cardDoc: cardDoc = {
        docId: doc.id,
        card: card,
      }
    
      cards.push(cardDoc);
    })

    return { name, tags, owner, cards };
  }
})
