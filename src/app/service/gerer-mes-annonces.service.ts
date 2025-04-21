import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GererMesAnnoncesService {

  constructor(private httpClient: HttpClient) { }

  updateAnnonce(id: string, data: any) {
    return this.httpClient.put(`http://127.0.0.1:8000/api/utilisateur/annonces/${id}`, data);
  }

  deleteAnnonce(id: string) {
    return this.httpClient.delete(`http://127.0.0.1:8000/api/utilisateur/annonces/${id}`);
  }
}
