import { Query } from 'firebase-admin/firestore'
import { firestore } from '../../utils/firebase'
import { deck } from '../../../types/type'

export default defineEventHandler(async (event) => {
  console.log('res')
  const uid = getCookie(event, 'uid')
  const type = getCookie(event, 'type')
  const headers =  new Headers({
    "Cookie": `uid=${uid}`,
  });
  headers.append("Cookie", `type=${type}`);
  const query = getQuery(event);
  const searchTerm = query.term;
  let tags: string[] = []

  if(query.tags) {
    tags = decodeURIComponent(query.tags.toString()).split(',');
  }
  let results: deck[] = [];
  if(tags.length)
  {
    let q: Query;
    for (let idx = 0; idx < tags.length; idx++) {
      const tag = tags[idx];
      if (idx === 0) {
        q = firestore.collection('decks')
        .where(`tags.${tag}`, '==', true);
      } else {
        q = q!?.where(`tags.${tag}`, '==', true);
      }
    }
    if(searchTerm) {
      q = q!?.where('keywords', 'array-contains', searchTerm);
    }
    const snapshot = await q!.select('name', 'owner', 'tags').get();
    console.log('there are tags')
    if(snapshot.empty){
      console.log('nothing found')
    } else {
      snapshot.forEach((doc)=>{
        const tagsMap = doc.data().tags;
        const data = {
          name: doc.data().name,
          owner: doc.data().owner,
          tags: Object.keys(tagsMap).filter(tag => tagsMap[tag]),
          id: doc.id
        }
        results = [...results, data];
      })
    }
  }
  else if (searchTerm) {
    const snapshot = await firestore.collection('decks')
                .where('keywords', 'array-contains', searchTerm).select('name', 'owner', 'tags').get()
    console.log('no tags')
    if(snapshot.empty){
      console.log('nothing found')
    } else {
      snapshot.forEach((doc)=>{
        const tagsMap = doc.data().tags;
        const data = {
          name: doc.data().name,
          owner: doc.data().owner,
          tags: Object.keys(tagsMap).filter(tag => tagsMap[tag]),
          id: doc.id
        }
        results = [...results, data];
      })
    }
  }
  return results;
})
