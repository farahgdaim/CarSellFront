import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {
  private apiBase = environment.apiUrl + '/utilisateur';

  constructor(private http: HttpClient) { }

  /** Include Authorization header */
  private getAuthOptions() {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    return {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    };
  }

  /** Check if user has already requested an evaluation for an annonce */
  checkEvaluationRequest(annonceId: string): Observable<any> {
    return this.http.post(
      `${this.apiBase}/demande-evaluation/has-requested?id_annonce=${annonceId}`,
      {},
      this.getAuthOptions()
    );
  }

  /** Send a new evaluation request */
  requestEvaluation(ref_id_annonce: string, ref_id_expert: string): Observable<any> {
    return this.http.post(
      `${this.apiBase}/evaluation-request`,
      { ref_id_annonce, ref_id_expert },
      this.getAuthOptions()
    );
  }

  /** Check report status for an annonce */
  checkRapport(annonceId: string): Observable<any> {
    return this.http.get(
      `${this.apiBase}/rapport-status/${annonceId}`,
      this.getAuthOptions()
    );
  }

  /** Get detailed report info if submitted */
  rapportInfo(annonceId: string): Observable<any> {
    return this.http.get(
      `${this.apiBase}/rapport_info/${annonceId}`,
      this.getAuthOptions()
    );
  }

  /** Get expert details by ID */
  getExpertsById(expertId: string): Observable<any> {
    return this.http.get(
      `${this.apiBase}/experts/${expertId}`,
      this.getAuthOptions()
    );
  }

  /** List all my evaluation requests */
  getMyRequests(): Observable<any> {
    return this.http.get(
      `${this.apiBase}/mes-demandes`,
      this.getAuthOptions()
    );
  }

  /** Cancel a pending evaluation request */
  cancelRequest(demandeId: string): Observable<any> {
    return this.http.post(
      `${this.apiBase}/demande/${demandeId}/cancel`,
      {},
      this.getAuthOptions()
    );
  }
}
