import { getAuth } from "firebase-admin/auth";
import { app, firestore } from '../utils/firebase';

export default defineEventHandler(async (event) => {
  
  const config = useRuntimeConfig();

  const firebaseIdToken = event.headers.get('Authorization')?.split(" ");
  // console.log(firebaseIdToken);

  try{
    const expiration = new Date(Date.now() + config.public.authCookieExpires);
    console.log(new Date(Date.now()))
    console.log(config.public.authCookieExpires);
    console.log(expiration);
    const cookie = await getAuth(app).createSessionCookie(firebaseIdToken![1], { expiresIn: config.public.authCookieExpires });
    setCookie(event, config.public.authCookieName, cookie, {
      httpOnly: true,
      path: "/",
      expires: expiration
    });
    
    // below for subsequent request verification, will move to utils and then eventHandler onReq[util]
    const token = await getAuth(app).verifySessionCookie(cookie, true);
    console.log(token)
    const user = await getAuth(app).getUser(token.uid);
    const uid = user.uid;
    const type = (await firestore.collection('users').doc(uid).get()).get('account_type');
    setCookie(event, 'uid', uid, {
      httpOnly: true,
      path: "/",
      expires: expiration
    });
    setCookie(event, 'type', type, {
      path: "/",
      expires: expiration
    });
    return { uid, type };
  }
  catch (error) {
    console.log(error);

    return createError({
      statusCode: 401,
      message: "Not authenticated",
    });
  }
})
