import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from '@firebase/util';

interface UserInterface {
  isParked: boolean,  
  parkedLatitude: number,
  parkedLongitude: number,
  parkedTime: firebase.firestore.FieldValue
}   

const timestamp = firebase.firestore.FieldValue.serverTimestamp();
@Injectable()
export class AuthProvider {
  userCollectionRef: AngularFirestoreCollection<UserInterface>;

  constructor(
    public afs: AngularFirestore
  ) {
    this.userCollectionRef = this.afs.collection('user');
  }

  //logging user in
  loginUser(email: string, password: string): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }
  
  //creating new user
  signupUser(email: string, password: string): Promise<any> {
    this.userCollectionRef.add({
      isParked: false,
      parkedLatitude: 0,
      parkedLongitude: 0,
      parkedTime: timestamp
    })
    return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password);
    // .then( newUser => {
    //   firebase
    //   .database()
    //   .ref('/userProfile')
    //   .child(newUser.uid)
    //   .set({ email: email });
    // });
  }

  //resetting password
  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  //logging user out
  logoutUser(): Promise<void> {
    return firebase.auth().signOut();
  }
}
