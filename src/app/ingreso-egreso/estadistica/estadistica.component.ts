import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { IgresoEgreso } from '../ingreso-egreso.model';
import { Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {

  ingresos: number;
  egresos: number;
  cuantosIngresos: number;
  cuantosEgresos: number;

  subs: Subscription = new Subscription();

  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: number[] = [];

  constructor( private store: Store<AppState>) { }

  ngOnInit() {
    this.subs = this.store.select('ingresoEgreso')
    .subscribe( ingresoEgreso => {
      this.contarIngresoEgresos(ingresoEgreso.items);
     });
  }

  contarIngresoEgresos(items: IgresoEgreso[]) {
    this.ingresos = 0;
    this.egresos = 0;

    this.cuantosEgresos = 0;
    this.cuantosIngresos = 0;

    items.forEach( item => {


      this.doughnutChartData = [ this.ingresos, this.egresos];

      if ( item.type === 'ingreso') {
        this.cuantosIngresos ++;
        this.ingresos += item.amount;
      } else {
        this.cuantosEgresos ++;
        this.egresos += item.amount;
      }
    });

  }

}
