import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

const config = useRuntimeConfig();

export const app = initializeApp({
    credential: cert(config.serviceAccount),
    storageBucket: config.public.firebase.storageBucket
})
export const firestore = getFirestore(app);

export const bucket = getStorage(app).bucket();