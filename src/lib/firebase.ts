import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

class FirebaseVars {
  public async getApp(): Promise<FirebaseApp> {
    const { initializeApp } = await import('firebase/app');
    return initializeApp(firebaseConfig);
  }

  public async getAuth(): Promise<Auth> {
    const { getAuth } = await import('firebase/auth');
    const app = await this.getApp();
    return getAuth(app);
  }

  public async getFirestore(): Promise<Firestore> {
    const { getFirestore } = await import('firebase/firestore');
    const app = await this.getApp();
    return getFirestore(app);
  }
}

export default FirebaseVars;
