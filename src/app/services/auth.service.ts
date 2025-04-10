import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/auth'; // Base API URL
  public currentUser = new BehaviorSubject<any>(null); // Current user state

  constructor(private http: HttpClient, private tokenService: TokenService) {
    const token = this.tokenService.getToken(); // Fetch the token from TokenService
    if (token && this.isTokenValid(token)) {
      this.getUser().subscribe(
        (user) => this.currentUser.next(user), // Update user state
        () => this.currentUser.next(null) // Handle user fetch error
      );
    }
  }

  // Register a new user
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData).pipe(
      catchError((error) => {
        console.error('Registration failed:', error);
        throw error;
      })
    );
  }

  // Log in the user
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((res: any) => {
        if (res.data && res.data.access_token) {
          this.tokenService.setToken(res.data.access_token); // Save token
          this.currentUser.next(res.data); // Update current user
        }
      }),
      catchError((error) => {
        console.error('Login failed:', error);
        throw error;
      })
    );
  }

  // Log out the user
  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => {
        this.tokenService.removeTokens(); // Clear tokens
        this.currentUser.next(null); // Clear user state
        console.log('Logged out successfully');
      }),
      catchError((error) => {
        console.error('Logout failed:', error);
        throw error;
      })
    );
  }

  // Fetch the current logged-in user
  getUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`).pipe(
      catchError((error) => {
        console.error('Failed to fetch user data:', error);
        throw error;
      })
    );
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    const token = this.tokenService.getToken();
    return !!token && this.isTokenValid(token);
  }

  // Validate the token's expiration
  isTokenValid(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode token payload
      return payload.exp * 1000 > Date.now(); // Check if token is expired
    } catch (e) {
      console.error('Token validation error:', e);
      return false;
    }
  }
}