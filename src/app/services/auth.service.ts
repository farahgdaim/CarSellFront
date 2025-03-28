import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/auth';
  private tokenKey = 'access_token';
  public currentUser = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      this.currentUser.next({ token });
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
      })
    );    
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => {
        localStorage.removeItem(this.tokenKey);
        this.currentUser.next(null);
      })
    );
  }

  getUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
