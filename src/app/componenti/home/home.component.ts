import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Richiesta } from '../../../dto/Richiesta';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  showLogin: boolean = false;
  richiesteFiltrate: Richiesta[] = [];
  filtri:any;

  updateRichiesteFiltrate(richieste: Richiesta[]) {
    this.richiesteFiltrate = richieste;
  }

  updateFiltri(filtro: any) {
    this.filtri = filtro;
  }

  ngOnInit(): void {
    this.checkAuthentication();
  }

  constructor(private router: Router, private auth: AuthService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showLogin = event.url === 'home';
      }
    });
  }

  checkAuthentication(): boolean {
    return this.auth.isAuthenticated();
  }

}
