import { app, firestore } from '../utils/firebase';

export default defineEventHandler(async (event) => {


  const formdata = await readMultipartFormData(event);
  let deckName = '';
  let tags: string[] = [];
  
  if(formdata){
    deckName = formdata[0].data.toString('utf-8');
    tags = JSON.parse(formdata[1].data.toString('utf-8'));
  }
  
  const uid = getCookie(event, 'uid');
  if(uid){
    const teacherName = (await firestore.collection('users').doc(uid).get()).get('name');
    firestore.collection('decks').doc(uid).set({
      name: deckName,
      tags: tags,
      owner: teacherName
    })
    firestore.collection('personalizedDecks').doc(uid).set({
      name: deckName,
      tags: tags
    })
  } else {
    console.log('error');
  }
  
  return 'Hello Nitro'
})
