import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IgresoEgreso } from './ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, map } from 'rxjs/Operators';
import { SetItemsActions, UnsetItemsActions } from './ingreso-egreso.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  ingresoEgresoListenerSubs: Subscription = new Subscription();
  ingresoEgresoItemsSubs: Subscription = new Subscription();
  constructor(private afDB: AngularFirestore,
              public authService: AuthService,
              private store: Store<AppState>) { }


  initIngresoEgresoListener() {
    this.ingresoEgresoListenerSubs = this.store.select('auth')
    .pipe(
      filter( auth => auth.user !== null )
    )
    .subscribe( auth => this.ingresoEgresoItems(auth.user.uid));
  }

  private ingresoEgresoItems( uid: string ){
    this.ingresoEgresoItemsSubs = this.afDB.collection(`${uid}/ingreso-egreso/items`)
              .snapshotChanges()
              .pipe(
                map( docData => {
                  return docData.map( doc => {
                    return {
                      uid: doc.payload.doc.id,
                      ...doc.payload.doc.data()
                    };
                  });
                })
              )
              .subscribe( (coleccion: any[]) => {
                this.store.dispatch( new SetItemsActions(coleccion));
              });
  }

  crearIngresoEgreso( ingresoEgreso: IgresoEgreso ) {
    const user = this.authService.getUsuario();
    return this.afDB.doc(`${user.uid}/ingreso-egreso`)
    .collection('items').add({...ingresoEgreso});
  }

  borrarIngresoEgreso( uid: string ) {
    const user = this.authService.getUsuario();
    return this.afDB.doc(`${user.uid}/ingreso-egreso/items/${uid}`)
    .delete();
  }

  cancelarSubscriptions() {
    this.store.dispatch(new UnsetItemsActions());
    this.ingresoEgresoItemsSubs.unsubscribe();
    this.ingresoEgresoListenerSubs.unsubscribe();
  }

}
