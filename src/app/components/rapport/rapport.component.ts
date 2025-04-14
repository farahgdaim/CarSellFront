import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConversationService } from 'src/app/services/conversation.service';
import { AuthService } from 'src/app/services/auth.service';
import { EvaluationService } from 'src/app/service/evaluation.service';
import { DetailAnnonceService } from 'src/app/service/detail-annonce.service';
@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.css']
})
export class RapportComponent implements OnInit {
  annonce: any = { images: [] };
  rapport:any = null;
  expert:any = null;
  constructor(
      private route: ActivatedRoute,
      private http: HttpClient,
      private conversationService: ConversationService,
      private router: Router,
      private authService: AuthService,
      private evaluationService: EvaluationService,
      private annonceService: DetailAnnonceService
    ) {}
  ngOnInit(): void {
    this.getAnnonceDetail();
    

  }
  getAnnonceDetail() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.annonceService.getAnnonceById(id).subscribe((res) => {
      console.log("l'annonce el ma7nouna ", res);
      if (res && typeof res === 'object' && 'data' in res) {
        this.annonce = res.data;
        this.getRapportDetail(this.annonce.id);
        // this.genererCategories();
      } else {
        console.error('Format inattendu :', res);
        this.annonce = []; // Évite une erreur si la réponse n'est pas correcte
      }
    });
  }

  getRapportDetail(annonceId:string){
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.evaluationService.rapportInfo(annonceId).subscribe((res:any) => {
      console.log("res", res);
    
       
        this.rapport = res.data; 
        console.log(this.rapport);
        this.getExpertByid(this.rapport.id_expert);
        
        // this.genererCategories();
      
    });
  }
  getExpertByid(expertId:string){
   
    this.evaluationService.getExpertsById(expertId).subscribe((res:any) => {
        this.expert = res.data;
      
    });

  }
}
