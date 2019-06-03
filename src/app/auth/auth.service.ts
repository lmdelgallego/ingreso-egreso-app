import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { map } from 'rxjs/Operators';

import Swal from 'sweetalert2';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';
import { SetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubscription: Subscription = new Subscription();

  constructor( private afAuth: AngularFireAuth,
                private router: Router,
                private afDB: AngularFirestore,
                private store: Store<AppState> ) { }

  initAuthListener() {
    this.afAuth.authState.subscribe( (fbUser: firebase.User) => {
      if (fbUser) {
        this.userSubscription = this.afDB.doc(`${fbUser.uid}/usuario`).valueChanges()
        .subscribe( (userObj: any) => {
          const newUser = new User(userObj);
          this.store.dispatch( new SetUserAction(newUser));
        });
      } else {
        this.userSubscription.unsubscribe();
      }
    });
  }

  crearUsuario( nombre: string, email: string, password: string) {

    this.store.dispatch( new ActivarLoadingAction() );

    this.afAuth.auth
    .createUserWithEmailAndPassword(email, password)
    .then( resp => {
      const user: User = {
        uid: resp.user.uid,
        nombre: nombre,
        email: resp.user.email
      };

      this.afDB.doc(`${user.uid}/usuario`)
      .set(user)
      .then( () => {
        this.router.navigate(['/']);
      });

    })
    .catch( error => {
      console.error(error);
      Swal.fire('Error en el registro de usuario', error.message, 'error');
    })
    .finally( () => {
      this.store.dispatch( new DesactivarLoadingAction() );
    });
  }

  logIn( email: string, password: string) {
    this.store.dispatch( new ActivarLoadingAction() );
    this.afAuth.auth
    .signInWithEmailAndPassword(email, password)
    .then( resp => {
      this.router.navigate(['/']);
    })
    .catch( error => {
      Swal.fire('Error en el login', error.message, 'error');
    })
    .finally(() => this.store.dispatch(new DesactivarLoadingAction() ));

  }

  logOut() {
    this.afAuth.auth.signOut()
    .then( resp => {
      this.router.navigate(['/login']);
    } );
  }

  isAuth() {
    return this.afAuth.authState
    .pipe(
      map( fbUser => {
        if ( fbUser == null) {
          this.router.navigate(['/login']);
        }
        return fbUser != null;
      })
    );
  }

}
