import { Component, NgModule } from '@angular/core';
import { LoginComponent } from './componenti/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componenti/home/home.component';
import { authGuard } from './auth/auth.guard';
import { FiltriComponent } from './componenti/filtri/filtri.component';

import { TabellaRichiesteFiltriComponent } from './componenti/tabellaRichiesteFiltri/tabella-richieste-filtri.component';
import { TabellaRichiesteComponent } from './componenti/tabellaRichiesteInserimento/tabella-richieste.component';
import { TabellaRichiesteVisualizzaComponent } from './componenti/tabellaRichiesteVisualizza/tabella-richieste-visualizza.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path:'visualizza',
    component: TabellaRichiesteVisualizzaComponent,
    canActivate: [authGuard]
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
