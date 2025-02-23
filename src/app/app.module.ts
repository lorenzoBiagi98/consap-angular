import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componenti/login/login.component';
import { HomeComponent } from './componenti/home/home.component';
import { FooterComponent } from './componenti/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './componenti/navbar/navbar.component';
import { HeroComponent } from './componenti/hero/hero.component';
import { FiltriComponent } from './componenti/filtri/filtri.component';
import { TabellaRichiesteFiltriComponent } from './componenti/richieste/tabellaRichiesteFiltri/tabella-richieste-filtri.component';
import { InserimentoComponent } from './componenti/richieste/inserimento/inserimento.component';
import { VisualizzaComponent } from './componenti/richieste/visualizza/visualizza.component';
import { ModificaComponent } from './componenti/richieste/modifica/modifica.component';
import { ModalComponent } from './componenti/modal/modal.component';
import { PaginatorComponent } from './componenti/paginator/paginator.component';
import { TabellaRichiesteFiltri2Component } from './componenti/richieste/tabellaRichiesteFiltri2/tabella-richieste-filtri2.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { LoadingComponent } from './componenti/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FiltriComponent,
    HomeComponent,
    FooterComponent,
    NavbarComponent,
    HeroComponent,
    TabellaRichiesteFiltriComponent,
    InserimentoComponent,
    VisualizzaComponent,
    ModificaComponent,
    ModalComponent,
    PaginatorComponent,
    TabellaRichiesteFiltri2Component,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
