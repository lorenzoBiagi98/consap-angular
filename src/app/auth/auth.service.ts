import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  private readonly AUTH_KEY = 'encrypted_Token';

  constructor() {}

  isAuthenticated(): boolean {
    if (typeof sessionStorage !== 'undefined') {
        const encryptedToken = sessionStorage.getItem(this.AUTH_KEY);
        if (encryptedToken) {
            return this.isLoggedIn = true;
        }
    }
    return this.isLoggedIn= false;
}
}
