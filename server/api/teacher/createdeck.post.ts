import { app, firestore } from '../../utils/firebase';
import { FieldValue } from 'firebase-admin/firestore'

export default defineEventHandler(async (event) => {


  const formdata = await readMultipartFormData(event);
  let deckName = '';
  let tags: string[] = [];
  
  if(formdata){
    deckName = formdata[0].data.toString('utf-8');
    console.log(JSON.parse(formdata[1].data.toString('utf-8')))
    tags = JSON.parse(formdata[1].data.toString('utf-8'));
  }
  
  const uid = getCookie(event, 'uid');
  if(uid){
    const teacherName = (await firestore.collection('users').doc(uid).get()).get('name');
    const docId = firestore.collection('decks').doc() // generate random id-> deck between 2 collections have same id to ease editing
    // decks will be queried for search page
    // personalizedDecks will be queried index page after login
    docId.set({
      name: deckName,
      tags: tags,
      owner: teacherName,
      uid: uid
    })

    const personalizedDoc = await $fetch('/api/teacher/personalizedDecks',
      { headers: {
        'Cookie' : `uid=${uid}`
      } }
    );
    // limit to 15 per user
    // if array is empty 
    console.log(personalizedDoc.length)
    if (personalizedDoc.length < 15) {
      firestore.collection('personalizedDecks').doc(uid).set({
        decks: FieldValue.arrayUnion(
          ...[
          { 
            deckId: docId.id,
            name: deckName,
            tags: tags
          }
        ])
      },
      { merge: true })
    }


    
  } else {
    console.log('error');
  }
  
  return 'Hello Nitro'
})
