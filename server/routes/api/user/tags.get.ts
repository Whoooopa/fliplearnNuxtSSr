import { firestore } from "../../../utils/firebase"

export default defineEventHandler(async (event) => {
 
  const snapshot = await firestore.collection('tags').doc('YxHwDHCyXkdwoZ28hWDE').get()
  const tags = snapshot.data()?.tags
  return { ...tags }
})
