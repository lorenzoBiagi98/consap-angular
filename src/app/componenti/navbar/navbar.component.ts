import { Component } from '@angular/core';
import { ChiamateService } from '../../connessioni/chiamate.service';
import { AuthService } from '../../auth/auth.service';
import { TokenService } from '../../token/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private instance: ChiamateService, private auth:AuthService) {}
  
  logout() {
    sessionStorage.removeItem('encrypted_Token');
    sessionStorage.removeItem('secret_Key');
    console.log('token rimosso!')
    console.log('chiave rimossa!')
    this.instance.logoutRequest().subscribe();
  }

  checkAuthentication():boolean{
    return this.auth.isAuthenticated();
  }
}
