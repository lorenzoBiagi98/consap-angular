import { Component, OnInit} from '@angular/core';
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
  forkJoin([
    this.fetch.getApplicativi(),
    this.fetch.getStatiRichiestaConsap(),
    this.fetch.getStatiRichiestaOs(),
    this.fetch.getStatiApprovazioneConsap(),
    this.fetch.getStatiApprovazioneOs(),
    this.fetch.getCommesseOs()
  ]).subscribe(
    ([applicativi, statiRichiestaConsap, statiRichiestaOs, statiApprovazioneConsap, statiApprovazioneOs, commesseOs]) => {
      this.applicativo = applicativi;
      this.statoRichiestaConsap = statiRichiestaConsap;
      this.statoRichiestaOs = statiRichiestaOs;
      this.statoApprovazioneConsap = statiApprovazioneConsap;
      this.statoApprovazioneOs = statiApprovazioneOs;
      this.commessaOs = commesseOs;
    }
  );
    
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
    const filtro = {
      erroreDTO: null,
      filtri: null,
      elenco: [
        {
          id: null,
          numeroTicket: parseInt(this.form.value.numeroTicket) || null,
          applicativo: {
            applicativoId: parseInt(this.form.value.applicativo) || null,
          },
          oggetto: this.form.value.oggetto || null,
          statoRichiestaConsap: {
            statoRichiestaConsapId: parseInt(this.form.value.statoRichiestaConsap) || null,
          },
          dataCreazione: this.form.value.dataCreazione || null,
          statoApprovazioneConsap: {
            statoApprovazioneConsapId: parseInt(this.form.value.statoApprovazioneConsap) || null,
          },
          statoApprovazioneOs: {
            statoApprovazioneOsId: parseInt(this.form.value.statoApprovazioneOs) || null,
          },
          statoRichiestaOs: {
            statoRichiestaOsId: parseInt(this.form.value.statoRichiestaOs) || null,
          },
          dataStimaFinale:this.form.value.dataStimaFinale || null,
          importo: this.form.value.importo || null,
          commessaOs: {
            commessaOsId: parseInt(this.form.value.commessaOs) || null,
          }
        }
      ]
    };

    this.instance.setFiltriInserimento(filtro);

    this.instance.RichiestaInserimento(filtro).subscribe(
      (response: any) => {
        console.log('Risposta dal backend:', response);
        },
        (error: any) => {
          console.error('Errore nella chiama POST:', error);
        }
      );
  }

  goBack():void{
    history.back
  }
}
