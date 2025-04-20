import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ExpertService {
  private apiUrl = `${environment.apiUrl}/expert`;

  constructor(private http: HttpClient) {}

  // 1) Pending list (already exists)
  getPendingEvaluations(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/evaluations/pending`);
  }

  // 2) Fetch one evaluation with details
  getEvaluation(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/evaluation/${id}`);
  }

  // 3) Accept a demande
  acceptEvaluation(id: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/evaluation/${id}/accept`, {});
  }

  // 4) Reject a demande
  rejectEvaluation(id: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/evaluation/${id}/reject`, {});
  }

  // 5) Submit a rapport
  submitRapport(id: string, contenu: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/evaluation/${id}/rapport`, { contenu });
  }

  /** Liste des demandes acceptées en attente de rapport */
  getAcceptedEvaluations(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/evaluations/accepted`);
  }

}
