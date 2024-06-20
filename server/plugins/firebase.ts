import { initializeApp } from "firebase/app";

export default defineNitroPlugin((nitroApp) => {
    // Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: useRuntimeConfig().firebaseApiKey,
        authDomain: useRuntimeConfig().authDomain,
        projectId: useRuntimeConfig().projectId,
        storageBucket: useRuntimeConfig().storageBucket,
        messagingSenderId: useRuntimeConfig().messagingSenderId,
        appId: useRuntimeConfig().appId,
        measurementId: useRuntimeConfig().measurementId
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    return app;
})
