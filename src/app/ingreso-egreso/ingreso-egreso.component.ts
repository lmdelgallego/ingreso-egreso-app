import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IgresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egresp.service';

import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';

import * as fromIngresoEgreso from './ingreso-egreso.reducer';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  form: FormGroup;
  type = 'ingreso';
  isLoading: boolean;
  loadingSubs: Subscription = new Subscription();

  constructor(public ieService: IngresoEgresoService,
              private store: Store<fromIngresoEgreso.AppState>) { }

  ngOnInit() {

    this.loadingSubs = this.store.select('ui')
    .subscribe( ui => {
      this.isLoading = ui.isLoading;
    });

    this.form = new FormGroup({
      'description': new FormControl('', Validators.required),
      'amount': new FormControl(0, Validators.min(1))
    });
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

  crearIngresoEgreso() {
    this.store.dispatch( new ActivarLoadingAction() );
    const ingresoEgreso = new IgresoEgreso({...this.form.value, type: this.type });
    this.ieService.crearIngresoEgreso(ingresoEgreso)
    .then(() => {
      Swal.fire('Creado', ingresoEgreso.description, 'success');
      this.form.reset({ amount: 0});
    })
    .catch( err => {
      console.log(err);
      Swal.fire('Error', err.message, 'error');
    })
    .finally(() => this.store.dispatch( new DesactivarLoadingAction() ));
  }
}
