import { Injectable } from '@angular/core';
@Injectable()
export class AuthService {
  private isLoggedIn = false;
  login(username: string, password: string): boolean {
    // simple hardcoded check
    if (username === 'admin' && password === 'admin') {
      this.isLoggedIn = true;
      return true;
    }
    return false;
  }
  logout() {
    this.isLoggedIn = false;
  }
  getAuth() {
    return this.isLoggedIn;
  }
}
