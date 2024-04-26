import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ChiamateService } from '../../connessioni/chiamate.service';
import { Applicativo } from '../../../dto/Applicativo';
import { StatoRichiestaCONSAP } from '../../../dto/StatoRichiestaCONSAP';
import { StatoRichiestaOS } from '../../../dto/StatoRichiestaOS';
import { StatoApprovazioneCONSAP } from '../../../dto/StatoApprovazioneCONSAP';
import { StatoApprovazioneOS } from '../../../dto/StatoApprovazioneOS';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Richiesta } from '../../../dto/Richiesta';

@Component({
  selector: 'app-filtri',
  templateUrl: './filtri.component.html',
})
export class FiltriComponent implements OnInit {
    /*
   *###################################################################################################
   OUTPUT
   *###################################################################################################
   */
  @Output() richiesteFiltrateChange: EventEmitter<Richiesta[]> =
    new EventEmitter<Richiesta[]>();
  @Output() filtriChange: EventEmitter<any> = new EventEmitter<any>();
    /*
   *###################################################################################################
   VARIABILI
   *###################################################################################################
   */
  selectedOption: string | null = null;
  form: FormGroup = null;
  ricercaEffettuata: boolean = false;
  selectedElementsPerPage: number = 5;
  elementsPerPage: number[] = [1, 5, 10];
  elPerPage: number = 5;
  /*
   *###################################################################################################
   ARRAY DI OGGETTI
   *###################################################################################################
   */
  applicativo: Applicativo[] = [];
  statoRichiestaConsap: StatoRichiestaCONSAP[] = [];
  statoRichiestaOs: StatoRichiestaOS[] = [];
  statoApprovazioneConsap: StatoApprovazioneCONSAP[] = [];
  statoApprovazioneOs: StatoApprovazioneOS[] = [];
  richiesta: Richiesta[] = [];
  currentPage: number = 1;
  richiesteTotali: number = 0;
    /*
   *###################################################################################################
   GESTIONE DELLA PAGINAZIONE
   *###################################################################################################
   */

  onElementsPerPageChange(event: any): void {
    this.elPerPage = event.target.value;
  }

  handleNextPage() {
    this.currentPage++;
    this.onSubmit();
  }

  handlePreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.onSubmit();
    }
  }
    onOptionSelected(event: any) {
    const selectedValue = event.target.value;
    this.selectedOption = selectedValue !== undefined ? selectedValue : null;
  }
    /*
   *###################################################################################################
  INIZIALIZZAZIONE FORM
   *###################################################################################################
   */
  constructor(private instance: ChiamateService) {
    this.form = new FormGroup({
      numeroTicket: new FormControl('', [
        Validators.maxLength(5),
        Validators.pattern(/^[0-9]*$/),
      ]),
      oggetto: new FormControl(''),
      applicativo: new FormControl(''),
      statoRichiestaConsap: new FormControl(''),
      statoRichiestaOs: new FormControl(''),
      statoApprovazioneConsap: new FormControl(''),
      statoApprovazioneOs: new FormControl(''),
    });
  }
  /*
   *###################################################################################################
  FETCHING DATI
   *###################################################################################################
   */
  ngOnInit(): void {
    this.getApplicativi();
    this.getStatiRichiestaConsap();
    this.getStatiRichiestaOs();
    this.getStatiApprovazioneConsap();
    this.getStatiApprovazioneOs();
  }
    /*
   *###################################################################################################
  STILE PERSONALIZZATO
   *###################################################################################################
   */
  filtryStyle: any = {
    'border-radius': '30px',
    'box-shadow': '0 30px 30px rgba(0, 0, 0, 0.1)',
  };
  /*
   *###################################################################################################
  VALORIZZAZIONE FORM, FETCHING RICHIESTE FILTRATE
   *###################################################################################################
   */
  onSubmit() {
    const filtro = {
      id: null,
      numeroTicket: this.form.value.numeroTicket || null,
      applicativo: this.form.value.applicativo || null,
      oggetto: this.form.value.oggetto || null,
      statoRichiestaConsap: this.form.value.statoRichiestaConsap || null,
      dataCreazione: null,
      statoApprovazioneConsap: this.form.value.statoApprovazioneConsap || null,
      statoApprovazioneOs: this.form.value.statoApprovazioneOs || null,
      statoRichiestaOs: this.form.value.statoRichiestaOs || null,
      dataStimaFinale: null,
      importo: null,
      commessaOs: null,
    };

    this.instance.setFiltri(filtro);

    this.instance
      .RichiestaGet(filtro, this.currentPage, this.elPerPage)
      .subscribe(
        (response: any) => {
          console.log('Risposta dal backend:', response);
          this.richiesta = response.body.elenco.content;
          this.filtriChange.emit(filtro);
          this.richiesteFiltrateChange.emit(this.richiesta);
          this.richiesteTotali = response.body.elenco.totalElements;
        },
        (error: any) => {
          console.error('Errore nella chiama POST:', error);
        }
      );
  }
  /*
   *###################################################################################################
   LETTURA APPLICATIVI
   *###################################################################################################
   */
  getApplicativi() {
    this.instance.applicativoGet().subscribe(
      (response: any) => {
        console.log('Risposta dal backend:', response);
        this.applicativo = response.body.elenco;
      },
      (error: any) => {
        console.error('Errore nella chiama POST:', error);
      }
    );
  }
  /*
   *###################################################################################################
   LETTURA STATO RICHIESTE CONSAP
   *###################################################################################################
   */
  getStatiRichiestaConsap() {
    this.instance.statoRichiestaConsapGet().subscribe(
      (response: any) => {
        console.log('Risposta dal backend:', response);
        this.statoRichiestaConsap = response.body.elenco;
      },
      (error: any) => {
        console.error('Errore nella chiama POST:', error);
      }
    );
  }
  /*
   *###################################################################################################
   LETTURA STATO RICHIESTE OS
   *###################################################################################################
   */
  getStatiRichiestaOs() {
    this.instance.statoRichiestaOsGet().subscribe(
      (response: any) => {
        console.log('Risposta dal backend:', response);
        this.statoRichiestaOs = response.body.elenco;
      },
      (error: any) => {
        console.error('Errore nella chiama POST:', error);
      }
    );
  }
  /*
   *###################################################################################################
   LETTURA APPROVAZIONE RICHIESTE CONSAP
   *###################################################################################################
   */
  getStatiApprovazioneConsap() {
    this.instance.statoApprovazioneConsapGet().subscribe(
      (response: any) => {
        console.log('Risposta dal backend:', response);
        this.statoApprovazioneConsap = response.body.elenco;
      },
      (error: any) => {
        console.error('Errore nella chiama POST:', error);
      }
    );
  }
  /*
   *###################################################################################################
   LETTURA APPROVAZIONE RICHIESTE OS
   *###################################################################################################
   */
  getStatiApprovazioneOs() {
    this.instance.statoApprovazioneOsGet().subscribe(
      (response: any) => {
        console.log('Risposta dal backend:', response);
        this.statoApprovazioneOs = response.body.elenco;
      },
      (error: any) => {
        console.error('Errore nella chiama POST:', error);
      }
    );
  }
}
