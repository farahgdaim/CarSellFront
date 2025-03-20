import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = environment.apiUrl + '/admin';

  constructor(private http: HttpClient) {}

  getPendingExpertRequests(): Observable<any> {
    return this.http.get(`${this.apiUrl}/expert-requests`);
  }

  acceptExpertRequest(requestId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/expert-request/${requestId}/accept`, {});
  }

  rejectExpertRequest(requestId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/expert-request/${requestId}/reject`, {});
  }
}
