import { Component, NgModule } from '@angular/core';
import { LoginComponent } from './componenti/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componenti/home/home.component';
import { authGuard } from './auth/auth.guard';
import { FiltriComponent } from './componenti/filtri/filtri.component';
import { TabellaRichiesteFiltriComponent } from './componenti/richieste/tabellaRichiesteFiltri/tabella-richieste-filtri.component';
import { InserimentoComponent } from './componenti/richieste/inserimento/inserimento.component';
import { VisualizzaComponent } from './componenti/richieste/visualizza/visualizza.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path:'visualizza',
    component: VisualizzaComponent,
    canActivate: [authGuard]
  },
  {
    path:'inserimento',
    component: InserimentoComponent
  },
  {
    path: 'home',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
