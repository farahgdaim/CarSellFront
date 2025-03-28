import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpertService {
  private baseUrl = environment.apiUrl + '/utilisateur';

  constructor(private http: HttpClient) {}

  requestExpertRole(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/expert-request`, formData);
  }

  // Fetch all experts (with accepted status)
  getAllExperts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/experts`);
  }
}
