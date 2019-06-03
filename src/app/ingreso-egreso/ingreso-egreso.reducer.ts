import * as formIgresoEgreso from './ingreso-egreso.actions';
import { IgresoEgreso } from './ingreso-egreso.model';
import { AppState } from '../app.reducer';

export interface IngresoEgresoState {
  items: IgresoEgreso[];
}

export interface AppState extends AppState {
  ingresoEgreso: IngresoEgresoState;
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
