import { firestore } from '../../utils/firebase';
import { FieldValue } from 'firebase-admin/firestore'

export default defineEventHandler(async (event) => {


  const formdata = await readMultipartFormData(event);
  let deckName = '';
  let tags: string[] = [];
  let prevTags: string[] = [];
  
  if(!formdata) return;

  deckName = formdata[0].data.toString('utf-8');
  tags = JSON.parse(formdata[1].data.toString('utf-8'));
  const deckId = formdata[2].data.toString('utf-8');
  const prevDeckName = formdata[3].data.toString('utf-8');
  prevTags = JSON.parse(formdata[4].data.toString('utf-8'));
  
  const uid = getCookie(event, 'uid');
  if(!uid) return; 

  const docId = firestore.collection('decks').doc(deckId)
  docId.update({
    name: deckName, //update name and tags only
    tags: tags,
  })
  
  firestore.collection('personalizedDecks').doc(uid).update({
    decks: FieldValue.arrayRemove({ // remove the deck object
      deckId: deckId,
      name: prevDeckName,
      tags: prevTags 
    })
  })
  firestore.collection('personalizedDecks').doc(uid).set({
    decks: FieldValue.arrayUnion( // add a new object with new values
      ...[
      { 
        deckId: deckId,
        name: deckName,
        tags: tags
      }
    ])
  },
  { merge: true })
})
