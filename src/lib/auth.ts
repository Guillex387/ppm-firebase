import type { UserCredential } from 'firebase/auth';
import FirebaseVars from './firebase';

class AuthManager {
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

  public async sendPasswordReset(email: string) {
    const { sendPasswordResetEmail } = await import('firebase/auth');
    const vars = new FirebaseVars();
    await sendPasswordResetEmail(await vars.getAuth(), email);
  }

  public async signOut() {
    const { signOut } = await import('firebase/auth');
    const vars = new FirebaseVars();
    await signOut(await vars.getAuth());
  }
}

export default AuthManager;
