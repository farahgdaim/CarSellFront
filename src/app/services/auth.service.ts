import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/auth'; // Base API URL for auth endpoints
  public currentUser = new BehaviorSubject<any>(null); // Current user state
  private isExpertUser: boolean = false;

  constructor(private http: HttpClient, private tokenService: TokenService) {
    const token = this.tokenService.getToken();
    if (token && this.isTokenValid(token)) {
      this.getUser().subscribe(
        (user) => {
          this.currentUser.next(user);
          // ✅ Check expert status after getting user
          this.checkExpertStatus().subscribe((isExpert) => {
            this.setUserRole(isExpert);
          });
        },
        () => this.currentUser.next(null)
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
          this.tokenService.setToken(res.data.access_token);
          this.currentUser.next(res.data);
  
          // ✅ Call the checkExpertStatus method here
          this.checkExpertStatus().subscribe((isExpert) => {
            this.setUserRole(isExpert);
          });
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

  // Validate token expiration
  isTokenValid(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode token payload
      return payload.exp * 1000 > Date.now(); // Compare expiration with current time
    } catch (e) {
      console.error('Token validation error:', e);
      return false;
    }
  }

  // Set the expert role flag after login or via a dedicated check.
  setUserRole(isExpert: boolean): void {
    this.isExpertUser = isExpert;
  }

  // Returns true if the current user is marked as an expert.
  currentUserIsExpert(): boolean {
    return this.isExpertUser;
  }

  // Call this method to get the expert status from the backend.
  // The backend is expected to respond with an object like: { isExpert: true }.
  checkExpertStatus(): Observable<boolean> {
    // Adjust the URL below if your API endpoint differs
    return this.http.get<{ isExpert: boolean }>(`${environment.apiUrl}/auth/expert/check`)
      .pipe(
        map(response => response.isExpert),
        catchError((error) => {
          console.error('Error checking expert status:', error);
          throw error;
        })
      );
  }
}
