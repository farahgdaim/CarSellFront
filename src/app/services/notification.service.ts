import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = environment.apiUrl + '/notifications';

  constructor(private http: HttpClient) {}

  // Get notifications for the logged-in user
  getNotifications(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Mark a notification as read. The backend expects a payload with an 'index'
  markAsRead(index: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/read`, { index });
  }
}
