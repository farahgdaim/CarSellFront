import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/auth';
  private tokenKey = 'access_token';
  public currentUser = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    const token = this.getToken();
    if (token && this.isTokenValid()) {
      this.getUser().subscribe(user => {
        this.currentUser.next(user);
      });
    }
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((res: any) => {
        if (res.data && res.data.access_token) {
          localStorage.setItem(this.tokenKey, res.data.access_token);
          this.currentUser.next(res.data);
        }
      }),
      catchError((error) => {
        console.error('Login failed:', error);
        throw error;
      })
    );
  }

  logout(): Observable<any> {
    // Clear local token before the API call to ensure safety
    localStorage.removeItem(this.tokenKey);
    this.currentUser.next(null);
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => console.log('Logged out successfully'))
    );
  }

  getUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`).pipe(
      catchError((error) => {
        console.error('Failed to fetch user data:', error);
        throw error;
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken() && this.isTokenValid();
  }

  isTokenValid(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode token
      return payload.exp * 1000 > Date.now(); // Check expiration
    } catch (e) {
      console.error('Token validation error:', e);
      return false;
    }
  }
}