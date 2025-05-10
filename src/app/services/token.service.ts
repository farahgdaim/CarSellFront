import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";


@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private tokenKey = 'access_token';
  private adminTokenKey = 'admin_access_token';

  // Retrieve the standard token
  getToken(): string | null {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      const payload = jwtDecode(token);
      
      const isExpired = payload.exp && payload.exp * 1000 < Date.now();
      if (isExpired) {
        console.warn('TokenService: Token is expired');
        this.removeTokens(); // Remove expired token
        return null;
      }
    }
    return token;
  }

  // Retrieve the admin-specific token
  getAdminToken(): string | null {
    return localStorage.getItem(this.adminTokenKey);
  }

  // Store the standard token
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Store the admin-specific token
  setAdminToken(token: string): void {
    localStorage.setItem(this.adminTokenKey, token);
  }

  // Remove all tokens
  removeTokens(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.adminTokenKey);
  }
}