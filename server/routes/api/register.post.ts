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

  getAuth(app)
    .createUser({
      email: email,
      emailVerified: false,
      password: password,
      displayName: name
    }).then(documentReference => {
      
      firestore.collection('users')
       .doc(documentReference.uid).set({
          name: name,
          account_type: account_type
       })
    })
  
})
