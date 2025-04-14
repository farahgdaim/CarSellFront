import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  constructor(private httpClient: HttpClient) { }

  checkEvaluationRequest(annonceId:string){
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}` // ou sessionStorage selon où tu stockes le token
    };
    return this.httpClient.post(
      `http://127.0.0.1:8000/api/utilisateur/demande-evaluation/has-requested/?id_annonce=${annonceId}`,
      {},
      { headers }
    );
  }
  requestEvaluation(ref_id_annonce: string, ref_id_expert: string) {
  return this.httpClient.post('http://127.0.0.1:8000/api/utilisateur/evaluation-request', {
    ref_id_annonce,
    ref_id_expert
  });
}
checkRapport(annonceId:string){
  return this.httpClient.get(`http://127.0.0.1:8000/api/utilisateur/rapport-status/${annonceId}`);
}

rapportInfo(annonceId:string){
  return this.httpClient.get(`http://127.0.0.1:8000/api/utilisateur/rapport_info/${annonceId}`);
}
getExpertsById(expertId:string){
  return this.httpClient.get(`http://127.0.0.1:8000/api/utilisateur/experts/${expertId}`);
}

}
