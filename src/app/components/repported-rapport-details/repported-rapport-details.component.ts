import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EvaluationService } from 'src/app/service/evaluation.service';
import { RepportedRapportService } from 'src/app/service/repported-rapport.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-repported-rapport-details',
  templateUrl: './repported-rapport-details.component.html',
  styleUrls: ['./repported-rapport-details.component.css'],
})
export class RepportedRapportDetailsComponent implements OnInit {
  rapport:any=null;
  expert:any =null;
  error: string | null = null;
  modalVisible: boolean = false;
  modalMessage: string = '';
  modalSuccess: boolean = true;
  constructor(
    private route:ActivatedRoute,
    private repportedRapport :RepportedRapportService,
    private user:UserService,
     private router: Router,
  ){}
  ngOnInit(): void {this.getRapportDetail()}

  getRapportDetail(){
    const id = this.route.snapshot.paramMap.get('id');
    this.repportedRapport.getRepportedRapportById(id).subscribe((res:any)=>{
      
      if (res && typeof res === 'object' && 'data' in res) {
        
        this.rapport=res.data;
        this.getExpertByid(this.rapport.ref_id_expert)
      }else{
        
        this.router.navigate(['/admin/login']); 

        
      }
    })

  }
  getExpertByid(expertId:string){
   
    this.user.getUserById(expertId).subscribe((res:any) => {
        this.expert = res.data;
      
    });

  }


  deleteReportedAnnonce(id: string) {
    this.repportedRapport.deleteRepportedRapport(id).subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.modalMessage = response.data;
          this.modalSuccess = true;
          this.router.navigate(['/admin/repported-rapport']);
          
        } else {
          this.modalMessage = response.data || 'Erreur inconnue.';
          this.modalSuccess = false;
        }
        this.modalVisible = true;
      },
      (error) => {
        this.modalMessage = error.error?.data || 'Erreur lors de la suppression.';
        this.modalSuccess = false;
        this.modalVisible = true;
      }
    );
  }
  validateReportedAnnonce(id: string) {
    this.repportedRapport.validateRepportedRapport(id).subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.modalMessage = response.data;
          this.modalSuccess = true;
            this.router.navigate(['/admin/repported-rapport']);
          
        } else {
          this.modalMessage = response.data || 'Erreur inconnue.';
          this.modalSuccess = false;
        }
        this.modalVisible = true;
      },
      (error) => {
        this.modalMessage = error.error?.data || 'Erreur lors de la suppression.';
        this.modalSuccess = false;
        this.modalVisible = true;
      }
    );
  }
  closeModal() {
    this.modalVisible = false;
  }

}
