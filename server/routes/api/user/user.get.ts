import { firestore } from "../../../utils/firebase"

export default defineEventHandler(async (event) => {
  
  const uid = getCookie(event, 'uid');
  if(!uid) return;
  const user = await firestore.collection('users').doc(uid).get()
  const name = user.data()?.name;
  const profileUrl = user.data()?.imgUrl ?? '';
  const imgPath = user.data()?.imgPath ?? '';
  return { name, profileUrl, imgPath };
})
