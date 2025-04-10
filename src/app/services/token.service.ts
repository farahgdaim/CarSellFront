import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private tokenKey = 'access_token';
  private adminTokenKey = 'admin_access_token';

  // Retrieve the standard token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
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