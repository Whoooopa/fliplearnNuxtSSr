import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default defineEventHandler(async (event) => {
  // const auth = getAuth();
  const body = await readBody(event);

  // Extract email and password from the parsed body
  const { email, password } = body;
  console.log(email, password);
  // console.log(event._requestBody);
  // Return a response
  return {
    status: 'success',
    message: 'User registered successfully',
    data: {
      email,
    },
  };
  // createUserWithEmailAndPassword(auth, event._requestBodyemail, password)
  //   .then((userCredential) => {
  //     // Signed up 
  //     const user = userCredential.user;
  //     // ...
  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     // ..
  //   });
})
