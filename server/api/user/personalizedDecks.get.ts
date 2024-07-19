import { firestore } from "../../utils/firebase"
import { FieldPath } from 'firebase-admin/firestore';

export default defineEventHandler(async (event) => {
  
  
  const uid = getCookie(event, 'uid');
  const personalizedDecksRef = firestore.collection('personalizedDecks');
  let result: any[] = [];
  if (uid){
    const snapshot = await personalizedDecksRef.where(FieldPath.documentId(), '==', personalizedDecksRef.doc(uid)).get();
    if(!snapshot.empty) {
      snapshot.forEach(doc => {
        
        const data = doc.data();
        if(data.decks){
          
          data.decks.forEach(deck => {
            
            result = [...result, deck]
          })
        }
      })
        
    }
  }
  return result;
})
