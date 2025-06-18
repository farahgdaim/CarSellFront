import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EvaluationService } from 'src/app/service/evaluation.service';
import { RepportedRapportService } from 'src/app/service/repported-rapport.service';
import { UserService } from 'src/app/services/user.service';
import { LoadingService } from 'src/app/services/loading.service'; // Add this import

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
    private loadingService: LoadingService // Inject LoadingService
  ){}
  ngOnInit(): void {
    this.getRapportDetail();
  }

  getRapportDetail(){
    const id = this.route.snapshot.paramMap.get('id');
    this.loadingService.show(); // Show loader at start
    this.repportedRapport.getRepportedRapportById(id).subscribe((res:any)=>{
      if (res && typeof res === 'object' && 'data' in res) {
        this.rapport=res.data;
        this.getExpertByid(this.rapport.ref_id_expert);
      }else{
        this.router.navigate(['/admin/login']); 
      }
      this.loadingService.hide(); // Hide loader after data is loaded or error
    }, () => {
      this.loadingService.hide(); // Hide loader on error
    });
  }

  getExpertByid(expertId:string){
    this.loadingService.show(); // Show loader at start
    this.user.getUserById(expertId).subscribe((res:any) => {
      this.expert = res.data;
      this.loadingService.hide(); // Hide loader after data is loaded
    }, () => {
      this.loadingService.hide(); // Hide loader on error
    });
  }

  deleteReportedAnnonce(id: string) {
    this.loadingService.show(); // Show loader at start
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
        this.loadingService.hide(); // Hide loader after response
      },
      (error) => {
        this.modalMessage = error.error?.data || 'Erreur lors de la suppression.';
        this.modalSuccess = false;
        this.modalVisible = true;
        this.loadingService.hide(); // Hide loader on error
      }
    );
  }
  validateReportedAnnonce(id: string) {
    this.loadingService.show(); // Show loader at start
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
        this.loadingService.hide(); // Hide loader after response
      },
      (error) => {
        this.modalMessage = error.error?.data || 'Erreur lors de la suppression.';
        this.modalSuccess = false;
        this.modalVisible = true;
        this.loadingService.hide(); // Hide loader on error
      }
    );
  }
  closeModal() {
    this.modalVisible = false;
  }
}