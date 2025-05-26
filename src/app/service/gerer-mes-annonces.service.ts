import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class GererMesAnnoncesService {

  constructor(private httpClient: HttpClient) { }
updateAnnonce(id: string, formData: FormData): Observable<any> {
  console.log("l'id",id);
  console.log("formData",formData);
  
  
  return this.httpClient.put(`http://127.0.0.1:8000/api/utilisateur/Updateannonces/${id}`, formData);
}

updateImages(id: string, formData: FormData): Observable<any> {
  return this.httpClient.post(`http://127.0.0.1:8000/api/utilisateur/Updateannonces/${id}/images`, formData);
}

 
 /* updateAnnonce(id: string, data: any) {
  console.log("men service",data.images);
  console.log(data.vehicule);
  
  
    return this.httpClient.put(`http://127.0.0.1:8000/api/utilisateur/Updateannonces/${id}`, data);
  } */
 
  deleteAnnonce(id: string) {
    return this.httpClient.delete(`http://127.0.0.1:8000/api/utilisateur/annonces/${id}`);
  }

  
 
}
