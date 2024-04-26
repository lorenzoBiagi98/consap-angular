import { Component, Input } from '@angular/core';
import { ChiamateService } from '../../../connessioni/chiamate.service';
import { Router } from '@angular/router';
import { Richiesta } from '../../../../dto/Richiesta';

@Component({
  selector: 'app-tabella-richieste-filtri2',
  templateUrl: './tabella-richieste-filtri2.component.html',
  styleUrl: './tabella-richieste-filtri2.component.css',
})
export class TabellaRichiesteFiltri2Component {
  @Input() richiesta: Richiesta[] = [];
  @Input() filtro: any;
  currentPage: number = 1;
  selectedElementsPerPage: number = 5;
  elementsPerPage: number[] = [1, 5, 10];
  elPerPage: number = 5;
  totalElements: number;
  totalPages: number;
  campo: string;
  ordine: string;

  constructor(private instance: ChiamateService, private router: Router) {}

  onElementsPerPageChange(event:any) {
    this.elPerPage = event.target.value;
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
    console.log(this.elPerPage)
    const filtro = {
      // erroreDTO: null,
      // filtri: {
        id: null,
        numeroTicket: this.filtro?.numeroTicket || null,
        applicativo: this.filtro?.applicativo || null,
        oggetto: this.filtro?.oggetto || null,
        statoRichiestaConsap: this.filtro?.statoRichiestaConsap || null,
        dataCreazione: this.filtro?.dataCreazione || null,
        statoApprovazioneConsap: this.filtro?.statoApprovazioneConsap || null,
        statoApprovazioneOs:this.filtro?.statoApprovazioneOs || null,
        statoRichiestaOs: this.filtro?.statoRichiestaOs || null,
        dataStimaFinale: this.filtro?.dataStimaFinale || null,
        importo: this.filtro?.importo || null,
        commessaOs: this.filtro?.commessaOs || null,
      // },
      // elenco: null,
    };

    this.instance
      .RichiesteFiltrateGet(
        filtro,
        this.currentPage,
        this.elPerPage,
        this.campo,
        this.ordine
      )
      .subscribe((response) => {
        this.richiesta = response.body.elenco.content;
        this.totalElements = response.body.elenco.totalElements;
        this.totalPages = Math.ceil(
          this.totalElements / this.elPerPage
        );
      });
  }

  handleNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getRichiestaFiltrata();
    }
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
