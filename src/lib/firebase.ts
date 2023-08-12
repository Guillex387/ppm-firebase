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

interface VarsCache {
  app?: FirebaseApp;
  auth?: Auth;
  firestore?: Firestore;
}

/**
 * A class for obtain (async) the firebase vars (app, auth, ...)
 * @class
 */
class FirebaseVars {
  private static cache: VarsCache = {};
  /**
   * Gets the firebase app variable
   */
  public async getApp(): Promise<FirebaseApp> {
    if (FirebaseVars.cache.app) return FirebaseVars.cache.app;
    const { initializeApp } = await import('firebase/app');
    return initializeApp(firebaseConfig);
  }

  /**
   * Gets the firebase auth variable
   */
  public async getAuth(): Promise<Auth> {
    if (FirebaseVars.cache.auth) return FirebaseVars.cache.auth;
    const { getAuth } = await import('firebase/auth');
    const app = await this.getApp();
    return getAuth(app);
  }

  /**
   * Gets the firestore variable
   */
  public async getFirestore(): Promise<Firestore> {
    if (FirebaseVars.cache.firestore) return FirebaseVars.cache.firestore;
    const { getFirestore } = await import('firebase/firestore');
    const app = await this.getApp();
    return getFirestore(app);
  }
}

export default FirebaseVars;
