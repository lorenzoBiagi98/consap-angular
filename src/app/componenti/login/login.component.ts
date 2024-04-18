import { Component } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ChiamateService } from '../../connessioni/chiamate.service';
import { response } from 'express';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { SourceTextModule } from 'vm';
import { TokenService } from '../../token/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  userForm: FormGroup;
  isFormSubmitted: boolean = false;
  showPassword: boolean = false;

  constructor(
    private instance: ChiamateService,
    private router: Router,
    private auth: AuthService,
    private token: TokenService
  ) {
    this.userForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
      ]),
      password: new FormControl('', [Validators.required]),
      ricordami: new FormControl(false),
    });
  }

  onSubmit() {
    const isFormValid = this.userForm.valid;
    this.isFormSubmitted = true;
    const data = {
      username: this.userForm.get('username').value,
      password: this.userForm.get('password').value,
    };

    this.instance.loginRequest(data).subscribe(
      (response: any) => {
        console.log('Risposta dal backend:', response);
        if (response.status === 200) {
          const token = response.headers.get('access_token');
          this.token.setToken(token);
          const encryptedToken = this.token.encryptToken(this.token.getToken());
          //const secret_Key = this.token.generateSecretKey(32);
          sessionStorage.setItem('encrypted_Token',encryptedToken);
          //sessionStorage.setItem('secret_Key', secret_Key);
          //this.auth.isLoggedIn = true;
          this.router.navigate(['/home']);
        }
      },
      (error: any) => {
        console.error('Errore nella chiama POST:', error);
      }
    );
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
