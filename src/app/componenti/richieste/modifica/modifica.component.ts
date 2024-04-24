import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Applicativo } from '../../../../dto/Applicativo';
import { StatoRichiestaCONSAP } from '../../../../dto/StatoRichiestaCONSAP';
import { StatoRichiestaOS } from '../../../../dto/StatoRichiestaOS';
import { StatoApprovazioneCONSAP } from '../../../../dto/StatoApprovazioneCONSAP';
import { StatoApprovazioneOS } from '../../../../dto/StatoApprovazioneOS';
import { FetchService } from '../../../connessioni/fetch.service';
import { ChiamateService } from '../../../connessioni/chiamate.service';
import { CommessaOS } from '../../../../dto/CommessaOS';
import { forkJoin } from 'rxjs';
import { Richiesta } from '../../../../dto/Richiesta';

import { ModalComponent } from '../../modal/modal.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modifica',
  templateUrl: './modifica.component.html',
  styleUrl: './modifica.component.css',
})
export class ModificaComponent implements OnInit {
  @ViewChild(ModalComponent) modalComponent: ModalComponent;
  applicativo: Applicativo[] = [];
  statoRichiestaConsap: StatoRichiestaCONSAP[] = [];
  statoRichiestaOs: StatoRichiestaOS[] = [];
  statoApprovazioneConsap: StatoApprovazioneCONSAP[] = [];
  statoApprovazioneOs: StatoApprovazioneOS[] = [];
  commessaOs: CommessaOS[] = [];
  richiesta: Richiesta;
  nuovaRichiesta:Richiesta;
  form: FormGroup = null;
  isModalOpen: boolean = false;
  currentIndex:number = 0;
  richiestaId: number;

  filtryStyle: any = {
    'border-radius': '30px',
    'box-shadow': '0 30px 30px rgba(0, 0, 0, 0.1)',
  };

  constructor(private fetch: FetchService, private instance: ChiamateService, private router:Router, private route:ActivatedRoute) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.richiestaId = params['richiestaId'];
      const filtro = {
        id:this.richiestaId
      }
      this.instance.RichiestaGet(filtro,1,1).subscribe((response:any)=>{
        console.log(response)
        this.richiesta = response.body.elenco.content
        this.initializeForm();
      })
    });
     if (this.richiesta ) {
      const currentStateRichOsId = this.richiesta.statoRichiestaOs?.statoRichiestaOsId;
      const currentStateRichConsapId = this.richiesta.statoRichiestaConsap?.statoRichiestaConsapId;
      const currentStateAppOsId = this.richiesta.statoApprovazioneOs?.statoApprovazioneOsId;
      const currentStateAppConsapId = this.richiesta.statoApprovazioneConsap?.statoApprovazioneConsapId;
    if (currentStateRichConsapId != null) {
      const currentIndexRC = this.statoRichiestaConsap.findIndex(rich => rich.statoRichiestaConsapId === currentStateRichConsapId);
      if (currentIndexRC !== -1 && currentIndexRC < this.statoRichiestaConsap.length - 1) {
        this.currentIndex = currentIndexRC + 1;
      } else if (currentStateRichOsId != null) {
        const currentIndexRO = this.statoRichiestaOs.findIndex(rich => rich.statoRichiestaOsId === currentStateRichOsId);
        if (currentIndexRO !== -1 && currentIndexRO < this.statoRichiestaOs.length - 1) {
          this.currentIndex = currentIndexRO + 1;
        } else if (currentStateAppOsId != null) {
          const currentIndexAO = this.statoApprovazioneOs.findIndex(app => app.statoApprovazioneOsId === currentStateAppOsId);
          if (currentIndexAO !== -1 && currentIndexAO < this.statoApprovazioneOs.length - 1) {
            this.currentIndex = currentIndexAO + 1;
          } else if (currentStateAppConsapId != null) {
            const currentIndexAC = this.statoApprovazioneConsap.findIndex(app => app.statoApprovazioneConsapId === currentStateAppConsapId);
            if (currentIndexAC !== -1 && currentIndexAC < this.statoApprovazioneConsap.length - 1) {
              this.currentIndex = currentIndexAC + 1;
            }
          }
        }
      }
    }
  }

    forkJoin([
      this.fetch.getApplicativi(),
      this.fetch.getStatiRichiestaConsap(),
      this.fetch.getStatiRichiestaOs(),
      this.fetch.getStatiApprovazioneConsap(),
      this.fetch.getStatiApprovazioneOs(),
      this.fetch.getCommesseOs(),
    ]).subscribe(
      ([
        applicativi,
        statiRichiestaConsap,
        statiRichiestaOs,
        statiApprovazioneConsap,
        statiApprovazioneOs,
        commesseOs,
      ]) => {
        this.applicativo = applicativi;
        this.statoRichiestaConsap = statiRichiestaConsap;
        this.statoRichiestaOs = statiRichiestaOs;
        this.statoApprovazioneConsap = statiApprovazioneConsap;
        this.statoApprovazioneOs = statiApprovazioneOs;
        this.commessaOs = commesseOs;
        this.currentIndex = 1;
      }
    );
    this.initializeForm();
  }

  initializeForm() {
    this.form = new FormGroup({
      numeroTicket: new FormControl(this.richiesta[0]?.numeroTicket, [
        Validators.required,
      ]),
      oggetto: new FormControl(this.richiesta[0]?.oggetto, [Validators.required]),
      commessaOs: new FormControl(this.richiesta[0]?.commessaOs?.commessaOsId),
      applicativo: new FormControl(
        this.richiesta[0]?.applicativo?.descApplicativo,
        Validators.required
      ),
      statoRichiestaConsap: new FormControl(
        this.richiesta[0]?.statoRichiestaConsap?.statoRichiestaConsapId
      ),
      statoRichiestaOs: new FormControl(
        this.richiesta[0]?.statoRichiestaOs?.statoRichiestaOsId
      ),
      statoApprovazioneConsap: new FormControl(
        this.richiesta[0]?.statoApprovazioneConsap?.statoApprovazioneConsapId
      ),
      statoApprovazioneOs: new FormControl(
        this.richiesta[0]?.statoApprovazioneOs?.statoApprovazioneOsId
      ),
      dataCreazione: new FormControl(this.richiesta[0]?.dataCreazione, [
        Validators.required,
      ]),
      dataStimaFinale: new FormControl(this.richiesta[0]?.dataStimaFinale),
      importo: new FormControl(this.richiesta[0]?.importo),
    });
  }

  getNextValue(array: any[], currentId: number): any {
    if (currentId === null || currentId === undefined) {
      return array.length > 0 ? array[0] : 'Nessun valore successivo';
    }
  }

  onSubmit() {
    console.log(this.richiesta.id);
    const filtro1 = {
      erroreDTO: {
        idErrore: 0,
        descrizione: 'OK',
        messaggio: 'Operazione completata con successo',
      },
      filtri: {
        id: this.richiestaId,
        numeroTicket: null,
        applicativoId: null,
        oggetto: null,
        statoRichiestaConsapId: null,
        dataCreazione: null,
        statoApprovazioneConsapId: null,
        statoApprovazioneOsId: null,
        statoRichiestaOsId: null,
        dataStimaFinale: null,
        importo: null,
        commessaOsId: null,
      },
      elenco: [
        {
          id: null,
          numeroTicket: null,
          applicativoId: {
            id: this.form.value.applicativo,
          },
          oggetto: null,
          statoRichiestaConsap: {
            statoRichiestaConsapId:
              this.form.value.statoRichiestaConsap || null,
          },
          dataCreazione: this.form.value.dataCreazione || null,
          statoApprovazioneConsap: {
            statoApprovazioneConsapId:
                this.form.value.statoApprovazioneConsap
            || null,
          },
          statoApprovazioneOs: {
            statoApprovazioneOsId:
              this.form.value.statoApprovazioneOs || null,
          },
          statoRichiestaOs: {
            statoRichiestaOsId: this.form.value.statoRichiestaOs || null,
          },
          dataStimaFinale: this.form.value.dataStimaFinale || null,
          importo: this.form.value.importo.toString() || null,
          commessaOs: {
            commessaOsId: this.form.value.commessaOs || null,
          },
        },
      ],
    };

    console.log('filtro', filtro1);

    this.instance.RichiestaModifica(filtro1).subscribe(
      (response: any) => {
        console.log('Risposta dal backend:', response);
        this.openModal();
        setTimeout(() => {
          this.closeModal();
          setTimeout(() => {
          }, 2000);
        }, 2000);
      },
      (error: any) => {
        console.error('Errore nella chiamata POST:', error);
      }
    );
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  goBack():void{
    history.back();
  }
}
