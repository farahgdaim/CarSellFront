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

  createAnnonce(annonceData: any): Observable<any> {
    return this.http.post(this.apiUrl, annonceData);
  }
}
