import { firestore } from '../../utils/firebase'
import { FieldValue } from 'firebase-admin/firestore'

export default defineEventHandler(async (event) => {
  
  const uid = getCookie(event, 'uid');
  if(!uid) return; 

  const deckId = await readBody(event);
  const ref = firestore.collection('decks').doc(deckId);
  const deck = (await ref.get()).data();
  
  const name = deck?.name;
  const tags = deck?.tags;
  firestore.recursiveDelete(ref); // delete doc and subcollections
  
  firestore.collection('personalizedDecks').doc(uid).update({
    decks: FieldValue.arrayRemove({ // remove the deck object
      deckId: deckId,
      name: name,
      tags: tags 
    })
  })
})
