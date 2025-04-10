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
reportAnnonces(id: string) {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}` // ou sessionStorage selon où tu stockes le token
  };
  return this.httpClient.post(
    `http://127.0.0.1:8000/api/utilisateur/reportAnnonce/${id}`,
    {},
    { headers }
  );
}

createConversation(id:string){
  return this.httpClient.post(`http://127.0.0.1:8000/api/utilisateur/createConversation/${id}`, {});
}
}
