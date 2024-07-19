import { firestore } from '../../utils/firebase';
import { FieldValue } from 'firebase-admin/firestore';
import generateKeyWords from '../../utils/getKeywords';

export default defineEventHandler(async (event) => {


  const formdata = await readMultipartFormData(event);
  let deckName = '';
  let tags: string[] = [];
  
  if(formdata){
    deckName = formdata[0].data.toString('utf-8');
    tags = JSON.parse(formdata[1].data.toString('utf-8'));
  }
  
  const uid = getCookie(event, 'uid');
  const type = getCookie(event, 'type');
  if(uid){
    const teacherName = (await firestore.collection('users').doc(uid).get()).get('name');
    const docId = firestore.collection('decks').doc() // generate random id-> deck between 2 collections have same id to ease editing
    // decks will be queried for search page
    // personalizedDecks will be queried index page after login
    const keywords = generateKeyWords(deckName);
    const keyvalueTags: { [key: string]: boolean } = tags.reduce(function(map, obj) {
      map[obj] = true;
      return map;
    }, {});
    docId.set({
      name: deckName,
      tags: keyvalueTags,
      owner: teacherName,
      uid: uid,
      keywords: keywords,
    })
    const headers =  new Headers({
      "Cookie": `uid=${uid}`,
    });
    headers.append("Cookie", `type=${type}`);
    const personalizedDoc = await $fetch('/api/teacher/personalizedDecks',
      { headers: headers }
    );
    // limit to 15 per user
    // if array is empty 
    if (personalizedDoc.length < 15) {
      firestore.collection('personalizedDecks').doc(uid).set({
        decks: FieldValue.arrayUnion(
          ...[
          { 
            deckId: docId.id,
            name: deckName,
            tags: tags.sort()
          }
        ])
      },
      { merge: true })
    }

    // for fetching tags in /search
    firestore.collection('tags').doc('YxHwDHCyXkdwoZ28hWDE').update({
      tags: FieldValue.arrayUnion(...tags)
    })
    
  } else {
    console.log('error');
  }
})
