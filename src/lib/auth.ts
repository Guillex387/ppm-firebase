import type { UserCredential } from 'firebase/auth';
import FirebaseVars from './firebase';

/**
 * A class for manage the auth operations
 * @class
 */
class AuthManager {
  /**
   * Sign in a user in the app
   * @param email
   * @param password
   * @returns The user credentials
   */
  public async signIn(
    email: string,
    password: string
  ): Promise<UserCredential> {
    const { signInWithEmailAndPassword } = await import('firebase/auth');
    const vars = new FirebaseVars();
    return await signInWithEmailAndPassword(
      await vars.getAuth(),
      email,
      password
    );
  }

  /**
   * Send a email for reset the password of a user account
   * @param email
   */
  public async sendPasswordReset(email: string) {
    const { sendPasswordResetEmail } = await import('firebase/auth');
    const vars = new FirebaseVars();
    await sendPasswordResetEmail(await vars.getAuth(), email);
  }

  /**
   * Logout the actual user
   */
  public async signOut() {
    const { signOut } = await import('firebase/auth');
    const vars = new FirebaseVars();
    await signOut(await vars.getAuth());
  }
}

export default AuthManager;
