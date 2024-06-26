import { firestore } from '../utils/firebase';

export default defineEventHandler(async event => { 
    const ref = firestore.collection(`animals`);
    const snapshot = await ref.get();
    const data = snapshot.docs.map((doc) => doc.data());
    return data;
    /// test api for ssr data fetching
})