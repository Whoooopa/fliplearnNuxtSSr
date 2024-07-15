import { firestore, bucket } from '../../utils/firebase';

export default defineEventHandler(async (event) => {

  const { cardId, deckId, bucketPath } = JSON.parse(await readBody(event));
  
    if(bucketPath && bucketPath?.length != 0){
      bucket.file(bucketPath.toString()).delete();
    }
  firestore.collection('decks').doc(deckId).collection('cards').doc(cardId).delete()
})
