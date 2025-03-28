import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private apiUrl = environment.apiUrl + '/admin';
  private tokenKey = 'admin_access_token';
  public currentAdmin = new BehaviorSubject<any>(null);
  

  constructor(private http: HttpClient) {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      this.currentAdmin.next({ token });

    }
  }

  register(adminData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, adminData).pipe(
      catchError((error) => {
        console.error('Registration failed:', error);
        throw error;
      })
    );
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((res: any) => {
        localStorage.setItem(this.tokenKey, res.data.access_token); // Store the token
        this.currentAdmin.next(res.data);
      }),
      catchError((error) => {
        console.error('Login error:', error); // Log login errors
        throw error;
      })
    );
  }
  

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => {
        localStorage.removeItem(this.tokenKey);
        this.currentAdmin.next(null);
      }),
      catchError((error) => {
        console.error('Logout failed:', error);
        throw error;
      })
    );
  }

  getAdmin(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`);
  }
  
  

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
