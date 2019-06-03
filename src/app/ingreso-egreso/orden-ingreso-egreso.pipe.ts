import { Pipe, PipeTransform } from '@angular/core';
import { IgresoEgreso } from './ingreso-egreso.model';

@Pipe({
  name: 'ordenIngresoEgreso'
})
export class OrdenIngresoEgresoPipe implements PipeTransform {

  transform(items: IgresoEgreso[] ): IgresoEgreso[] {
    return items.sort( (a, b) => {
      if (a.type === 'ingreso') {
        return -1;
      } else {
        return 1;
      }
    });
  }

}
