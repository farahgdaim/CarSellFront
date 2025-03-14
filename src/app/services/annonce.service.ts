import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnonceService {
  private apiUrl = environment.apiUrl + '/utilisateur/annonces';

  constructor(private http: HttpClient) {}

  getAnnonces(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getAnnonceById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createAnnonce(annonce: any): Observable<any> {
    return this.http.post(this.apiUrl, annonce);
  }

  updateAnnonce(id: number, annonce: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, annonce);
  }

  deleteAnnonce(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  reportAnnonce(id: number): Observable<any> {
    return this.http.post(`${environment.apiUrl}/utilisateur/reportAnnonce/${id}`, {});
  }
}
