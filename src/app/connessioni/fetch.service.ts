import { Injectable, OnInit } from '@angular/core';
import { ChiamateService } from './chiamate.service';
import { Applicativo } from '../../dto/Applicativo';
import { StatoRichiestaCONSAP } from '../../dto/StatoRichiestaCONSAP';
import { StatoRichiestaOS } from '../../dto/StatoRichiestaOS';
import { StatoApprovazioneCONSAP } from '../../dto/StatoApprovazioneCONSAP';
import { StatoApprovazioneOS } from '../../dto/StatoApprovazioneOS';
import { Observable } from 'rxjs';
import { CommessaOS } from '../../dto/CommessaOS';

@Injectable({
  providedIn: 'root',
})
export class FetchService implements OnInit {
  constructor(private instance: ChiamateService) {}

  applicativo$: Observable<Applicativo[]>;
  statoRichiestaConsap$: Observable<StatoRichiestaCONSAP[]>;
  statoRichiestaOs$: Observable<StatoRichiestaOS[]>;
  statoApprovazioneConsap$: Observable<StatoApprovazioneCONSAP[]>;
  statoApprovazioneOs$: Observable<StatoApprovazioneOS[]>;
  commessaOs$: Observable<CommessaOS[]>;

  ngOnInit(): void {
    this.getApplicativi();
    this.getStatiRichiestaConsap();
    this.getStatiRichiestaOs();
    this.getStatiApprovazioneConsap();
    this.getStatiApprovazioneOs();
  }

  /*
   *###################################################################################################
   LETTURA APPLICATIVI
   *###################################################################################################
   */
  getApplicativi(): Observable<Applicativo[]> {
    this.applicativo$ = new Observable((observer) => {
      this.instance.applicativoGet().subscribe(
        (response: any) => {
          console.log('Risposta dal backend:', response);
          observer.next(response.body.elenco);
          observer.complete();
        },
        (error: any) => {
          console.error('Errore nella chiama POST:', error);
          observer.error(error);
        }
      );
    });

    return this.applicativo$;
  }
  /*
   *###################################################################################################
   LETTURA STATO RICHIESTE CONSAP
   *###################################################################################################
   */
  getStatiRichiestaConsap(): Observable<StatoRichiestaCONSAP[]> {
    this.statoRichiestaConsap$ = new Observable((observer) => {
      this.instance.statoRichiestaConsapGet().subscribe(
        (response: any) => {
          console.log('Risposta dal backend:', response);
          observer.next(response.body.elenco);
          observer.complete();
        },
        (error: any) => {
          console.error('Errore nella chiama POST:', error);
          observer.error(error);
        }
      );
    });

    return this.statoRichiestaConsap$;
  }
  /*
   *###################################################################################################
   LETTURA STATO RICHIESTE OS
   *###################################################################################################
   */
  getStatiRichiestaOs(): Observable<StatoRichiestaOS[]> {
    this.statoRichiestaOs$ = new Observable((observer) => {
      this.instance.statoRichiestaOsGet().subscribe(
        (response: any) => {
          console.log('Risposta dal backend:', response);
          observer.next(response.body.elenco);
          observer.complete();
        },
        (error: any) => {
          console.error('Errore nella chiama POST:', error);
          observer.error(error);
        }
      );
    });

    return this.statoRichiestaOs$;
  }
  /*
   *###################################################################################################
   LETTURA APPROVAZIONE RICHIESTE CONSAP
   *###################################################################################################
   */
  getStatiApprovazioneConsap(): Observable<StatoApprovazioneCONSAP[]> {
    this.statoApprovazioneConsap$ = new Observable((observer) => {
      this.instance.statoApprovazioneConsapGet().subscribe(
        (response: any) => {
          console.log('Risposta dal backend:', response);
          observer.next(response.body.elenco);
          observer.complete();
        },
        (error: any) => {
          console.error('Errore nella chiama POST:', error);
          observer.error(error);
        }
      );
    });

    return this.statoApprovazioneConsap$;
  }
  /*
   *###################################################################################################
   LETTURA APPROVAZIONE RICHIESTE OS
   *###################################################################################################
   */
  getStatiApprovazioneOs(): Observable<StatoApprovazioneOS[]> {
    this.statoApprovazioneOs$ = new Observable((observer) => {
      this.instance.statoApprovazioneOsGet().subscribe(
        (response: any) => {
          console.log('Risposta dal backend:', response);
          observer.next(response.body.elenco);
          observer.complete();
        },
        (error: any) => {
          console.error('Errore nella chiama POST:', error);
          observer.error(error);
        }
      );
    });

    return this.statoApprovazioneOs$;
  }
    /*
   *###################################################################################################
   LETTURA COMMESSE OS
   *###################################################################################################
   */
   getCommesseOs(): Observable<CommessaOS[]> {
    this.commessaOs$ = new Observable((observer) => {
      this.instance.commssaOsGet().subscribe(
        (response: any) => {
          console.log('Risposta dal backend:', response);
          observer.next(response.body.elenco);
          observer.complete();
        },
        (error: any) => {
          console.error('Errore nella chiama POST:', error);
          observer.error(error);
        }
      );
    });

    return this.commessaOs$;
  }
}
