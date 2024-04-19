import { Component, OnInit } from '@angular/core';
import { Richiesta } from '../../../../dto/Richiesta';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChiamateService } from '../../../connessioni/chiamate.service';

@Component({
  selector: 'app-visualizza',
  templateUrl: 'visualizza.component.html',
  styleUrl: 'visualizza.component.css',
})
export class VisualizzaComponent implements OnInit {
  richiesta: Richiesta = null;
  richiestaStorico : Richiesta []= [];
  form: FormGroup = null;

  filtro = {
    id: null
  }

  constructor(private route: ActivatedRoute, private instance:ChiamateService) {}

  ngOnInit(): void {
    this.richiesta = history.state.richiesta;
    this.filtro = {
      id:this.richiesta.id
    }
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
      dataStimaFinale : new FormControl(''),
      importo: new FormControl('')
    });
    
    console.log(this.filtro)
    this.instance.RichiestaStoricoGet(this.filtro).subscribe(
      (response: any) => {
        console.log('Risposta dal backend:', response);
        this.richiestaStorico = response.body.elenco.content;
        this.richiestaStorico.reverse();
        console.log("richiesta Storico",this.richiestaStorico)
        },
        (error: any) => {
          console.error('Errore nella chiama POST:', error);
        }
      );
  }
  
  selezionaRichiesta(richiesta: Richiesta) {
    this.richiesta = richiesta;
  }
}
