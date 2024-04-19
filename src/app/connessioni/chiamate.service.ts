import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { TokenService } from '../token/token.service';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChiamateService {
  /*
   *###################################################################################################
   BODY APPLICATIVO, STATI, APPROVAZIONI E COMMESSA
   *###################################################################################################
   */
  requestBody: any = {
    erroreDTO: null,
    filtri: {
      id: null,
      descrizione: null,
    },
    elenco: null,
  };
  /*
   *###################################################################################################
   BODY RICHIESTE FILTRATE
   *###################################################################################################
   */
  requestBodyRichiesta: any = {
    erroreDTO: null,
    filtri: {
      id: null,
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
    elenco: null,
  };
  /*
   *###################################################################################################
   BODY STORICO RICHIESTE
   *###################################################################################################
   */
  requestBodyStorico: any = {
    erroreDTO: null,
    filtri: {
      id: null,
    },
    elenco: null,
  };
    /*
   *###################################################################################################
   BODY INSERIMENTO RICHIESTA
   *###################################################################################################
   */
  requestBodyInserimento: any = {
    erroreDTO: null,
    filtri: null,
    elenco: [
      {
        id: null,
        numeroTicket: null,
        applicativo: {
          applicativoId: null,
        },
        oggetto: null,
        statoRichiestaConsap: {
          statoRichiestaConsapId: null,
        },
        dataCreazione: null,
        statoApprovazioneConsap: {
          statoApprovazioneConsapId: null,
        },
        statoApprovazioneOs: {
          statoApprovazioneOsId: null,
        },
        statoRichiestaOs: {
          statoRichiestaOsId: null,
        },
        dataStimaFinale: null,
        importo: null,
        commessaOs: {
          commessaOsId: null,
        },
      },
    ],
  };
  /*
   *###################################################################################################
   URL CHIAMATE
  *###################################################################################################
   */
  private urlLogin = 'http://localhost:8080/login';
  private urlLogout = 'http://localhost:8080/logout';
  private urlApplicativo = 'http://localhost:8080/applicativo';
  private urlStatoRichiestaConsap =
    'http://localhost:8080/statoRichiestaConsap';
  private urlStatoRichiestaOs = 'http://localhost:8080/statoRichiestaOs';
  private urlStatoApprovazioneConsap =
    'http://localhost:8080/approvazioneConsap';
  private urlStatoApprovazioneOs = 'http://localhost:8080/statoApprovazioneOs';
  private urlCommessaOs = 'http://localhost:8080/commessaOs'
  private urlRichiesta = 'http://localhost:8080/richiesta/1-5';
  private urlRichiestaStorico = 'http://localhost:8080/richiesta/storico/1-5';
  private urlRichiestaInserimento = 'http://localhost:8080/richiesta/new';

  constructor(private http: HttpClient, private token: TokenService) {}

  setFiltri(filtri: any) {
    this.requestBodyRichiesta.filtri = filtri;
  }

  setFiltriStorico(filtri: any) {
    this.requestBodyStorico.filtri = filtri;
  }

  setFiltriInserimento(filtri: any){
    this.requestBodyInserimento.elenco.push(filtri);
  }

  // getRequestBodyRichiesta() {
  //   return this.requestBodyRichiesta;
  // }

  loginRequest(data: any) {
    return this.http.post<any>(this.urlLogin, data, { observe: 'response' });
  }

  logoutRequest() {
    const token = sessionStorage.getItem('encrypted_Token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<any>(
      this.urlLogout,
      {},
      { headers, observe: 'response' }
    );
  }

  /*
   *###################################################################################################
   LETTURA APPLICATIVI
   *###################################################################################################
   */
  applicativoGet() {
    const encryptedToken = sessionStorage.getItem('encrypted_Token');
    const token = this.token.decryptToken(encryptedToken);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<any>(this.urlApplicativo, this.requestBody, {
      headers,
      observe: 'response',
    });
  }
  /*
   *###################################################################################################
   LETTURA STATO RICHIESTE CONSAP
   *###################################################################################################
   */
  statoRichiestaConsapGet() {
    const encryptedToken = sessionStorage.getItem('encrypted_Token');
    const token = this.token.decryptToken(encryptedToken);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<any>(this.urlStatoRichiestaConsap, this.requestBody, {
      headers,
      observe: 'response',
    });
  }
  /*
   *###################################################################################################
   LETTURA STATO RICHIESTE OS
   *###################################################################################################
   */
  statoRichiestaOsGet() {
    const encryptedToken = sessionStorage.getItem('encrypted_Token');
    const token = this.token.decryptToken(encryptedToken);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<any>(this.urlStatoRichiestaOs, this.requestBody, {
      headers,
      observe: 'response',
    });
  }
  /*
   *###################################################################################################
   LETTURA APPROVAZIONE RICHIESTE CONSAP
   *###################################################################################################
   */
  statoApprovazioneConsapGet() {
    
    const encryptedToken = sessionStorage.getItem('encrypted_Token');
    const token = this.token.decryptToken(encryptedToken);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<any>(
      this.urlStatoApprovazioneConsap,
      this.requestBody,
      {
        headers,
        observe: 'response',
      }
    );
  }
  /*
   *###################################################################################################
   LETTURA APPROVAZIONE RICHIESTE OS
   *###################################################################################################
   */
  statoApprovazioneOsGet() {
    const encryptedToken = sessionStorage.getItem('encrypted_Token');
    const token = this.token.decryptToken(encryptedToken);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<any>(this.urlStatoApprovazioneOs, this.requestBody, {
      headers,
      observe: 'response',
    });
  }
    /*
   *###################################################################################################
   LETTURA COMMESSE OS
   *###################################################################################################
   */
   commssaOsGet() {
    const encryptedToken = sessionStorage.getItem('encrypted_Token');
    const token = this.token.decryptToken(encryptedToken);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<any>(this.urlCommessaOs, this.requestBody, {
      headers,
      observe: 'response',
    });
  }
  /*
   *###################################################################################################
   LETTURA RICHIESTE
   *###################################################################################################
   */
   RichiestaGet(filtro: any) {
    const encryptedToken = sessionStorage.getItem('encrypted_Token');
    const token = this.token.decryptToken(encryptedToken);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  
    try {
      return this.http.post<any>(
        this.urlRichiesta,
        { filtri: filtro },
        {
          headers,
          observe: 'response',
        }
      ).pipe(
        catchError(error => {
          // Gestisci l'errore qui
          console.error('Si è verificato un errore:', error);
          return throwError(error); // Propaga l'errore al chiamante
        })
      );
    } catch (error) {
      console.error('Si è verificato un errore durante la richiesta:', error);
      return throwError(error); // Propaga l'errore al chiamante
    }
  }
  
  /*
   *###################################################################################################
   LETTURA STORICO RICHIESTE
   *###################################################################################################
   */
  RichiestaStoricoGet(filtro: any) {
    const encryptedToken = sessionStorage.getItem('encrypted_Token');
    const token = this.token.decryptToken(encryptedToken);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(
      this.urlRichiestaStorico,
      { filtri: filtro },
      {
        headers,
        observe: 'response',
      }
    );
  }
    /*
   *###################################################################################################
   INSERIMENTO RICHIESTA
   *###################################################################################################
   */
  RichiestaInserimento(filtro:any){
    console.log('filtro',filtro)
    const encryptedToken = sessionStorage.getItem('encrypted_Token');
    const token = this.token.decryptToken(encryptedToken);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<any>(
      this.urlRichiestaInserimento,
      { filtri: filtro },
      {
        headers,
        observe: 'response',
      }
    );
  }
}
