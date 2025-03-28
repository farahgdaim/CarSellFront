import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DetailAnnonceService {

  constructor(private httpClient: HttpClient) { }
  getAnnonceById(id: string|null) {
    return this.httpClient.get(`http://127.0.0.1:8000/api/annonces/${id}`);
}
}
