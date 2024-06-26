import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const config = useRuntimeConfig();

export const app = initializeApp({
    credential: cert(config.serviceAccount)
})
export const firestore = getFirestore(app);