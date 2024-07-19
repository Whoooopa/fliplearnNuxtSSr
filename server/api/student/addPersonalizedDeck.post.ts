import { firestore } from '../../utils/firebase'
import { FieldValue } from 'firebase-admin/firestore'

export default defineEventHandler(async (event) => {
  const uid = getCookie(event,'uid');
  if(!uid) return;
  const { deckId, name, owner, tags } = JSON.parse(await readBody(event));
  firestore.collection('personalizedDecks').doc(uid).set({
    decks: FieldValue.arrayUnion(
      ...[
      { 
        deckId: deckId,
        name: name,
        creator: owner,
        tags: tags.sort()
      }
    ])
  },
  { merge: true })
})
