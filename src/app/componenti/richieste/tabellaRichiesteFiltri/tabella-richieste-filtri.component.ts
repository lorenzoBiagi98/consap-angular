import { Component, Input, OnInit } from '@angular/core';
import { Richiesta } from '../../../../dto/Richiesta';
import { ChiamateService } from '../../../connessioni/chiamate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabella-richieste-filtri',
  templateUrl: './tabella-richieste-filtri.component.html',
  styleUrl: './tabella-richieste-filtri.component.css',
})
export class TabellaRichiesteFiltriComponent {
  @Input() richiesta: Richiesta[] = [];
  currentPage: number = 1;
  selectedElementsPerPage: number = 5;
  campo:string;
  ordine: string;

  constructor(private instance: ChiamateService, private router: Router) {}

  onElementsPerPageChange(value: number) {
    this.selectedElementsPerPage = value;
  }

  goToVisualizza(richiesta: Richiesta) {
    this.router.navigate(['visualizza'], { state: { richiesta } });
  }

  goToModifica(rich: Richiesta) {
    this.router.navigate(['/modifica'], {
      queryParams: { richiestaId: rich.id },
    });
  }

  getRichiestaFiltrata() {
    const filtro = {
      erroreDTO: null,
      filtri: {
        id: null,
        numeroTicket: null,
        applicativo: null,
        oggetto: null,
        statoRichietaConsap: null,
        dataCreazione: null,
        statoApprovazioneConsap: null,
        statoApprovazioneOs: null,
        statoRichiestaOs: null,
        dataStimaFinale: null,
        importo: null,
        commessaOs: null,
      },
      elenco: null,
    };
    this.instance
      .RichiesteFiltrateGet(filtro, this.currentPage, this.selectedElementsPerPage, this.campo, this.ordine)
      .subscribe((response) => {
        this.richiesta = response.body.elenco.content;
        console.log(this.richiesta)
      });
  }

    handleNextPage() {
    this.currentPage++;
    this.getRichiestaFiltrata();
  }

  handlePreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getRichiestaFiltrata();
    }
  }
  
  setCampoOrdine(campo: string, ordine: string) {
    this.campo = campo;
    this.ordine = ordine;
  }

}
