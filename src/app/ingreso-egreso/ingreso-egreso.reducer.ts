import * as formIgresoEgreso from './ingreso-egreso.actions';
import { IgresoEgreso } from './ingreso-egreso.model';

export interface IngresoEgresoState {
  items: IgresoEgreso[];
}

const initIngresoEgresoState: IngresoEgresoState = {
  items: []
};

export function ingresoEgresoReducer ( state = initIngresoEgresoState, action: formIgresoEgreso.ingresoEgresoActions ): IngresoEgresoState {

  switch (action.type) {
    case formIgresoEgreso.SET_ITEMS:
      return {
        items: [...action.items.map( item => {
          return {...item};
        })]
      };
    case formIgresoEgreso.UNSET_ITEMS:
      return{
        items: []
      };
    default:
      return state;
  }

}
