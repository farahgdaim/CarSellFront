import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RepportedRapportService {

  constructor(private httpClient: HttpClient) { }
  reportRapport(id: string) {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}` // ou sessionStorage selon où tu stockes le token
    };
    return this.httpClient.post(
      `http://127.0.0.1:8000/api/utilisateur/reportRapport/${id}`,
      {},
      { headers }
    );
  }
  getRepportedRapport(){
    return this.httpClient.get('http://127.0.0.1:8000/api/admin/reportedRapport');
  }
  getRepportedRapportById(id:string|null){
    return this.httpClient.get(`http://127.0.0.1:8000/api/admin/reportedRapport/${id}`)
  }

  deleteRepportedRapport(id:string){
    
    return this.httpClient.delete(`http://127.0.0.1:8000/api/admin/deleteReportedRapport/${id}`);
}

validateRepportedRapport(id:string){
  return this.httpClient.post(`http://127.0.0.1:8000/api/admin/validateRapport/${id}`,{});
}
}
