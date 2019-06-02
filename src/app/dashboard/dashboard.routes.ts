import { Routes } from '@angular/router';
import { EstadisticaComponent } from '../ingreso-egreso/estadistica/estadistica.component';
import { IngresoEgresoComponent } from '../ingreso-egreso/ingreso-egreso.component';
import { DetalleComponent } from '../ingreso-egreso/detalle/detalle.component';

export const dashboardRoutes: Routes = [
  { path: '', component: EstadisticaComponent},
  { path: 'ingreso-egresos', component: IngresoEgresoComponent},
  { path: 'detalle', component: DetalleComponent},
]


// import { Routes, RouterModule } from '@angular/router';
// import { NgModule } from '@angular/core';

// import { HomeComponent } from './';
// import { Name2Component } from './';
// import { Name3Component } from './';
// import { Name4Component } from './';
// import { PageNotFoundComponent } from './';

// const routes: Routes = [
//   { path: '', component: HomeComponent },
//   { path: 'path2', component: Name2Component },
//   { path: 'path3', component: Name3Component },
//   { path: 'path4', component: Name4Component },
//   { path: '**', component: PageNotFoundComponent },

//   //{ path: 'path/:routeParam', component: MyComponent },
//   //{ path: 'staticPath', component: ... },
//   //{ path: '**', component: ... },
//   //{ path: 'oldPath', redirectTo: '/staticPath' },
//   //{ path: ..., component: ..., data: { message: 'Custom' }
// ];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class FeatureRoutingModule {}
