import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RepportedRapportService } from 'src/app/service/repported-rapport.service';
import { LoadingService } from 'src/app/services/loading.service'; // Add this import

@Component({
  selector: 'app-repported-rapport',
  templateUrl: './repported-rapport.component.html',
  styleUrls: ['./repported-rapport.component.css']
})
export class RepportedRapportComponent implements OnInit {
  rapports:any;
  error: string | null = null;
  constructor(
    private repportedRapport: RepportedRapportService,
    private router: Router,
    private loadingService: LoadingService // Inject LoadingService
  ) {}

  ngOnInit(): void {
    this.getRapportData();
  }

  getRapportData(){
    this.loadingService.show(); // Show loader at start
    this.repportedRapport.getRepportedRapport().subscribe({
      next: (res: any) => {
        if (res && typeof res === 'object' && 'data' in res) {
          this.rapports = res.data;
        } else {
          console.error('Format inattendu :', res);
          this.rapports = [];
          this.router.navigate(['/admin/login']); 
        }
        this.loadingService.hide(); // Hide loader after data is loaded
      },
      error: () => {
        this.loadingService.hide(); // Hide loader on error
      }
    });
  }

  goToRapportDetails(id:string){
    this.router.navigate(['/admin/repported-rapport',id]);
  }
}