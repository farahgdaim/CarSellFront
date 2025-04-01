import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private httpClient: HttpClient) {}

  getData() {
    return this.httpClient.get('http://127.0.0.1:8000/api/annonces');
  }
  getNotificationsData() {
    return this.httpClient.get('http://127.0.0.1:8000/api/notifications');
  }
  searchAnnonces(criteria: any) {
    return this.httpClient.get(`http://127.0.0.1:8000/api/search`, {
      params: criteria,
    });
  }

  getAnnonceById(id: string) {
    return this.httpClient.get(`http://127.0.0.1:8000/api/annonces/${id}`);
  }
  getMarques() {
    return this.httpClient.get('http://127.0.0.1:8000/api/marques');
  }
  getModeles(marque: string) {
    return this.httpClient.get(`http://127.0.0.1:8000/api/modeles?marque=${marque}`);
  }
  getMesAnnonces(){
    return this.httpClient.get('http://127.0.0.1:8000/api/utilisateur/Mesannonces');
  }

  
}
