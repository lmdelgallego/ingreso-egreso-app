import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromIngresoEgreso from '../ingreso-egreso.reducer';
import { IgresoEgreso } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egresp.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy{

  itemsSubs: Subscription = new Subscription();
  items: IgresoEgreso[];

  constructor( private store: Store<fromIngresoEgreso.AppState>, public ieService: IngresoEgresoService) { }

  ngOnInit() {
    this.itemsSubs = this.store.select('ingresoEgreso')
    .subscribe( ({items}) => {
      this.items = items;
    });
  }

  ngOnDestroy() {
    this.itemsSubs.unsubscribe();
  }

  borrerItem( uid: string) {
    console.log(uid);
    this.ieService.borrarIngresoEgreso(uid)
    .then( (resp) => {
      console.log(resp);
      Swal.fire('Elemento borrado correctamente.', ' ', 'success');
    })
    .catch( err => {
      Swal.fire('Error', err.message, 'error');
    });
  }

}
