import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/Operators';
import { IngresoEgresoService } from 'src/app/ingreso-egreso/ingreso-egresp.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

  name: string;

  authSub: Subscription = new Subscription();

  constructor( private authService: AuthService,
              public ieService: IngresoEgresoService,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.authSub =  this.store.select('auth')
    .pipe( filter( auth => auth.user !== null ))
    .subscribe( auth => this.name = auth.user.nombre );
  }

  logOut() {
    this.ieService.cancelarSubscriptions();
    this.authService.logOut();
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }

}
