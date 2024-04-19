import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Applicativo } from '../../../../dto/Applicativo';
import { StatoRichiestaCONSAP } from '../../../../dto/StatoRichiestaCONSAP';
import { StatoRichiestaOS } from '../../../../dto/StatoRichiestaOS';
import { StatoApprovazioneCONSAP } from '../../../../dto/StatoApprovazioneCONSAP';
import { StatoApprovazioneOS } from '../../../../dto/StatoApprovazioneOS';
import { FetchService } from '../../../connessioni/fetch.service';
import { ChiamateService } from '../../../connessioni/chiamate.service';
import { CommessaOS } from '../../../../dto/CommessaOS';

@Component({
  selector: 'app-inserimento',
  templateUrl: 'inserimento.component.html',
  styleUrl: 'inserimento.component.css',
})
export class InserimentoComponent implements OnInit {
  applicativo: Applicativo[] = [];
  statoRichiestaConsap: StatoRichiestaCONSAP[] = [];
  statoRichiestaOs: StatoRichiestaOS[] = [];
  statoApprovazioneConsap: StatoApprovazioneCONSAP[] = [];
  statoApprovazioneOs: StatoApprovazioneOS[] = [];
  commessaOs: CommessaOS[] = [];
  form: FormGroup = null;

  filtryStyle: any = {
    'border-radius': '30px',
    'box-shadow': '0 30px 30px rgba(0, 0, 0, 0.1)',
  };

  constructor(private fetch: FetchService, private instance: ChiamateService) {}

  ngOnInit(): void {
    /*
   *###################################################################################################
   FETCH APPLICATIVI
   *###################################################################################################
   */
    this.fetch.getApplicativi().subscribe((data: Applicativo[]) => {
      this.applicativo = data;
    });
    /*
   *###################################################################################################
   FETCH STATI RICHIESTA CONSAP
   *###################################################################################################
   */
    this.fetch
      .getStatiRichiestaConsap()
      .subscribe((data: StatoRichiestaCONSAP[]) => {
        this.statoRichiestaConsap = data;
      });
    /*
   *###################################################################################################
   FETCH STATI RICHIESTA OS
   *###################################################################################################
   */
    this.fetch.getStatiRichiestaOs().subscribe((data: StatoRichiestaOS[]) => {
      this.statoRichiestaOs = data;
    });
    /*
   *###################################################################################################
   FETCH STATI APPROVAZIONE CONSAP
   *###################################################################################################
   */
    this.fetch
      .getStatiApprovazioneConsap()
      .subscribe((data: StatoApprovazioneCONSAP[]) => {
        this.statoApprovazioneConsap = data;
      });
    /*
   *###################################################################################################
   FETCH STATI APPROVAZIONE OS
   *###################################################################################################
   */
    this.fetch
      .getStatiApprovazioneOs()
      .subscribe((data: StatoApprovazioneOS[]) => {
        this.statoApprovazioneOs = data;
      });
          /*
   *###################################################################################################
   FETCH COMMESSE OS
   *###################################################################################################
   */
   this.fetch
   .getCommesseOs()
   .subscribe((data: CommessaOS[]) => {
     this.commessaOs = data;
   });

      

    this.form = new FormGroup({
      numeroTicket: new FormControl('', [
        Validators.maxLength(5),
        Validators.minLength(5),
        Validators.pattern(/^[0-9]*$/),
        Validators.required,
      ]),
      oggetto: new FormControl('', [Validators.required]),
      commessaOs: new FormControl(''),
      applicativo: new FormControl('', Validators.required),
      statoRichiestaConsap: new FormControl(''),
      statoRichiestaOs: new FormControl(''),
      statoApprovazioneConsap: new FormControl(''),
      statoApprovazioneOs: new FormControl(''),
      dataCreazione: new FormControl('', [Validators.required]),
      dataStimaFinale: new FormControl(''),
      importo: new FormControl(''),
    });
  }

  onSubmit() {
    
    // const filtro = {
    //   "erroreDTO": null,
    //   "filtri": null,
    //   "elenco":[{
    //   id: null,
    //   numeroTicket: this.form.value.numeroTicket || null,
    //   applicativo: this.form.value.applicativo || null,
    //   oggetto: this.form.value.oggetto || null,
    //   statoRichietaConsap: this.form.value.statoRichiestaConsap || null,
    //   dataCreazione: this.form.value.statoRichiestaOs || null,
    //   statoApprovazioneConsap:
    //     this.form.value.statoApprovazioneConsap || null,
    //   statoApprovazioneOs: this.form.value.statoApprovazioneOs || null,
    //   statoRichiestaOs: this.form.value.statoRichiestaOs || null,
    //   dataStimaFinale: this.form.value.dataStimaFinale || null,
    //   importo: this.form.value.importo || null,
    //   commessaOs: this.form.value.commessaOs || null,
    // }]};

    const filtro = {
      erroreDTO: null,
      filtri: null,
      elenco: [
        {
          id: null,
          numeroTicket: this.form.value.numeroTicket || null,
          applicativo: {
            applicativoId: this.form.value.applicativo || null,
          },
          oggetto: this.form.value.oggetto || null,
          statoRichiestaConsap: {
            statoRichiestaConsapId: this.form.value.statoRichiestaConsap || null,
          },
          dataCreazione: this.form.value.statoRichiestaOs || null,
          statoApprovazioneConsap: {
            statoApprovazioneConsapId: this.form.value.statoApprovazioneConsap || null,
          },
          statoApprovazioneOs: {
            statoApprovazioneOsId: this.form.value.statoApprovazioneOs || null,
          },
          statoRichiestaOs: {
            statoRichiestaOsId: this.form.value.statoRichiestaOs || null,
          },
          dataStimaFinale:this.form.value.dataStimaFinale || null,
          importo: this.form.value.importo || null,
          commessaOs: {
            commessaOsId: this.form.value.commessaOs || null,
          }
        }
      ]
    };

    this.instance.setFiltriInserimento(filtro);

    //this.instance.setFiltriInserimento(filtro);
    console.log('filtro in inserimento',filtro)

    this.instance.RichiestaInserimento(filtro).subscribe(
      (response: any) => {
        console.log('Risposta dal backend:', response);
        },
        (error: any) => {
          console.error('Errore nella chiama POST:', error);
        }
      );
  }
}
