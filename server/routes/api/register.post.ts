import { getAuth } from "firebase-admin/auth";
import { app, firestore } from '../../utils/firebase';


export default defineEventHandler(async (event) => {
  
  const formdata = await readMultipartFormData(event);

  // Extract email and password from the parsed body
  let name = '';
  let email = '';
  let password = '';
  let account_type = '';
  
  if(formdata){
    name = formdata[0].data.toString('utf-8');
    email = formdata[1].data.toString('utf-8');
    password = formdata[2].data.toString('utf-8');
    account_type = formdata[3].data.toString('utf-8');
  }
  // console.log(event._requestBody);

  try {
    // Create a new user in Firebase Auth
    const userRecord = await getAuth(app).createUser({
      email,
      emailVerified: false,
      password,
      displayName: name
    });

    // Store additional user information in Firestore
    await firestore.collection('users').doc(userRecord.uid).set({
      name,
      account_type
    });

    return {
      status: 'success',
      uid: userRecord.uid
    };

  } catch (error) {
    console.error("Error creating user:", error);
    return {
      status: 'error'
    };
  }
  
})
