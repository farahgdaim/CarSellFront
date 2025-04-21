import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RepportedAnnoncesService {

  constructor(private httpClient: HttpClient) { }
  getRepportedAnnonces() {
    return this.httpClient.get('http://127.0.0.1:8000/api/admin/reportedAnnonces');
  }
  deleteRepportedAnnonce(id:string){
    
      return this.httpClient.delete(`http://127.0.0.1:8000/api/admin/deleteReportedAnnonce/${id}`);
  }

  validateRepportedAnnonce(id:string){
    return this.httpClient.post(`http://127.0.0.1:8000/api/admin/validateAnnonce/${id}`,{});
  }
}
