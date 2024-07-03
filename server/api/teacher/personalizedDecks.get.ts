import { app,firestore } from "../../utils/firebase"
import { FieldPath } from 'firebase-admin/firestore';

export default defineEventHandler(async (event) => {
  
  
  const uid = getCookie(event, 'uid');
  const personalizedDecksRef = firestore.collection('personalizedDecks');
  let result: any[] = [];
  if (uid){
    const snapshot = await personalizedDecksRef.where(FieldPath.documentId(), '==', personalizedDecksRef.doc(uid)).get();

    if (snapshot.empty){
      // console.log('No matching documents');
    }

    snapshot.forEach(doc => {
      // console.log(doc.id ,'=>', doc.data());
      const data = doc.data();
      // console.log(data.decks)
      data.decks.forEach(deck => {
        // console.log(deck.name, deck.deckId)
        result = [...result, deck]
      })
    })
  }
  return result;
})
