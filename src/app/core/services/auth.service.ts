import { Injectable, NgZone } from '@angular/core';
import { User } from "./user";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase} from '@angular/fire/database';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any; // Save logged in user data
  public resultUpdater$: Subject<any> = new Subject<any>();
  users: any[] = [];
  results: any[] = [];

  constructor(
    private db: AngularFireDatabase,
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    this.userData = JSON.parse(localStorage.getItem('user'));
  }

  // Sign in with email/password
  SignIn(email, password): any {

    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.db.list('Users').valueChanges().subscribe(users => {
          this.users = users;
          this.userData = this.users.filter(x => x.uid === result.user.uid)[0];
          localStorage.setItem('user', JSON.stringify(this.userData));
        });
        // this.router.navigate(['dashboard']);
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  phoneLogin(phoneNumber): string{
    this.db.list('Users').valueChanges().subscribe(users => {
      this.users = users;
      this.userData = this.users.filter(x => x.phoneNumber === phoneNumber)[0];
      if (this.userData !== undefined){
        localStorage.setItem('user', JSON.stringify(this.userData));
        this.router.navigate(['dashboard']);
        return 'logged';
      }else{
        return 'register';
      }
    });
    return 'cancel';
  }

  // Sign up with email/password
  SignUp(email, password): any {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.resultUpdater$.next(result);

        // this.SendVerificationMail();
        // this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  // Send email verfificaiton when new user sign up
  async SendVerificationMail() {
    await (await this.afAuth.currentUser).sendEmailVerification();
    this.router.navigate(['/auth/login', 'verify-email']);
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail): any {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error);
      });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user == null){
      return false;
    }else{
      if (user.email === 'user@user.com'){
        return (user !== null) ? true : false;
      }else{
        return (user !== null) ? true : false;
      }
    }
    // return (user !== null) ? true : false;
  }

  // Sign in with Google
  GoogleAuth(): any {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider): any {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error);
      });
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user): void {
    const registerUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      address: user.address,
      phoneNumber: user.phoneNumber,
      emailVerified: user.emailVerified
    };

    if (user.email !== 'user@user.com'){
      this.SendVerificationMail();
    }else{
      this.userData = registerUser;
      localStorage.setItem('user', JSON.stringify(this.userData));
    }

    const userRef = this.db.list('Users');
    userRef.push(registerUser);
    this.router.navigate(['dashboard']);
  }

  // Sign out
  SignOut(): any {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }



}
