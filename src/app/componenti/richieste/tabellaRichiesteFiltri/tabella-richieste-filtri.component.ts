import { Component, Input, OnInit } from '@angular/core';
import { Richiesta } from '../../../../dto/Richiesta';
import { ChiamateService } from '../../../connessioni/chiamate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabella-richieste-filtri',
  templateUrl: './tabella-richieste-filtri.component.html',
  styleUrl: './tabella-richieste-filtri.component.css',
})
export class TabellaRichiesteFiltriComponent implements OnInit{
  @Input() richiesta: Richiesta[] = [];

  ngOnInit(): void {
  }

  constructor(private instance: ChiamateService, private router:Router){}

  goToVisualizza(richiesta: Richiesta) {
    this.router.navigate(['visualizza'], { state: { richiesta } });
  }
  

}
