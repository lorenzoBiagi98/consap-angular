import { Component, OnInit } from '@angular/core';
import { Richiesta } from '../../../../dto/Richiesta';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ChiamateService } from '../../../connessioni/chiamate.service';

@Component({
  selector: 'app-visualizza',
  templateUrl: 'visualizza.component.html',
  styleUrl: 'visualizza.component.css',
})
export class VisualizzaComponent implements OnInit {
  richiesta: Richiesta = null;
  richiestaStorico: Richiesta[] = [];
  form: FormGroup = null;
  currentPage: number = 1;
  selectedElementsPerPage: number = 5;
  elementsPerPage: number[] = [1, 5, 10];
  elPerPage: number = 5;
  totalElements: number;
  totalPages: number;
  campo: string = "dataInserimento"
  ordine: string = "desc"

  filtro = {
    id: null,
  };

  constructor(
    private route: ActivatedRoute,
    private instance: ChiamateService
  ) {}

  onElementsPerPageChange(event: any) {
    this.elPerPage = event.target.value;
  }

  handleNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getRichiestaStorico();
    }
  }

  handlePreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getRichiestaStorico();
    }
  }

  setCampoOrdine(campo: string, ordine: string) {
    this.campo = campo;
    this.ordine = ordine;
  }

  ngOnInit(): void {
    this.richiesta = history.state.richiesta;
    this.filtro = {
      id: this.richiesta.id,
    };
    this.form = new FormGroup({
      numeroTicket: new FormControl(''),
      oggetto: new FormControl(''),
      commessaOs: new FormControl(''),
      applicativo: new FormControl(''),
      statoRichiestaConsap: new FormControl(''),
      statoRichiestaOs: new FormControl(''),
      statoApprovazioneConsap: new FormControl(''),
      statoApprovazioneOs: new FormControl(''),
      dataCreazione: new FormControl(''),
      dataStimaFinale: new FormControl(''),
      importo: new FormControl(''),
    });
    this.getRichiestaStorico();
    console.log(this.filtro);
  }

  getRichiestaStorico() {
    this.instance
      .RichiestaStoricoGet(
        this.filtro,
        this.currentPage,
        this.elPerPage,
        this.campo,
        this.ordine
      )
      .subscribe(
        (response: any) => {
          console.log('Risposta dal backend:', response);
          this.richiestaStorico = response.body.elenco.content;
          // this.richiestaStorico.reverse();
          this.totalElements = response.body.elenco.totalElements;
          this.totalPages = Math.ceil(this.totalElements / this.elPerPage);
          console.log('richiesta Storico', this.richiestaStorico);
        },
        (error: any) => {
          console.error('Errore nella chiama POST:', error);
        }
      );
  }



  selezionaRichiesta(richiesta: Richiesta) {
    this.richiesta = richiesta;
  }

  goBack(): void {
    history.back();
  }

  formatData(data: Date): string {
    const formattedDate = data.toString();
    const newFormattedDate = formattedDate.slice(0, -7);
    return newFormattedDate.replace('T', '  ');
  }
}
