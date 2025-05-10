import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConversationService } from 'src/app/services/conversation.service';
import { AuthService } from 'src/app/services/auth.service';
import { EvaluationService } from 'src/app/service/evaluation.service';
import { DetailAnnonceService } from 'src/app/service/detail-annonce.service';
import { RepportedRapportService } from 'src/app/service/repported-rapport.service';

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.css']
})
export class RapportComponent implements OnInit {
  reportRows: { 
    name: string;
    annonceValue: any;
    realValue: string;
    match: boolean;
  }[] = [];
  item: any = null;
  annonce: any = { images: [] };
  rapport:any = null;
  expert:any = null;
  user: any = null;
  loggedInUserId: string = '';
  modalVisible: boolean = false;
  modalMessage: string = '';
  modalSuccess: boolean = true;
  constructor(
      private route: ActivatedRoute,
      private evalService: EvaluationService,
      private http: HttpClient,
      private repportRapport: RepportedRapportService,
      private conversationService: ConversationService,
      private router: Router,
      private authService: AuthService,
      private evaluationService: EvaluationService,
      private annonceService: DetailAnnonceService
    ) {}
  ngOnInit(): void {
    this.getAnnonceDetail();
    this.authService.getUser().subscribe({
      next: (res: any) => {
        this.loggedInUserId = res.data.id || res.data._id;
      },
      error: (err) => {
        console.error(
          "Erreur lors de la récupération de l'utilisateur connecté",
          err
        );
      },
    });
    
    

  }
  getAnnonceDetail() {
    const id = this.route.snapshot.paramMap.get('id')!;
  
    this.annonceService.getAnnonceById(id).subscribe((res) => {
      
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
    
    this.evaluationService.rapportInfo(annonceId).subscribe((res:any) => {
    
    
       
        this.rapport = res.data; 
        
        this.getExpertByid(this.rapport.id_expert);
        
        // this.genererCategories();
      
    });
  }
  getExpertByid(expertId:string){
   
    this.evaluationService.getExpertsById(expertId).subscribe((res:any) => {
        this.expert = res.data;
      
    });

  }
  reportRapport(id: string) {
    

    this.repportRapport.reportRapport(id).subscribe(
      (response: any) => {
       

        // 🔹 Si le backend retourne bien un status 200
        if (response.status === 200) {
          this.modalMessage = response.data;
          
          
          this.modalSuccess = true;
        } else {
          this.modalMessage = response.data || 'Une erreur est survenue.';
          this.modalSuccess = false;
          
        }

        this.modalVisible = true;
      },
      (error) => {
        console.error("Erreur lors du signalement du rapport", error);

        // 🔸 On récupère le message d’erreur depuis le backend
        this.modalMessage =
          error.error?.data || 'Une erreur est survenue lors du signalement.';
        this.modalSuccess = false;
        this.modalVisible = true;
      }
    );
  }
 

  closeModal() {
    this.modalVisible = false;
  }
}
