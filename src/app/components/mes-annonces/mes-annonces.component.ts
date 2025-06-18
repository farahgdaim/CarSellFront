import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-mes-annonces',
  templateUrl: './mes-annonces.component.html',
  styleUrls: ['./mes-annonces.component.css']
})
export class MesAnnoncesComponent implements OnInit {
  annonces: any;
  constructor(
    private dataService: DataService,
    private router: Router,
    private loadingService: LoadingService // Inject LoadingService
  ) {}

  ngOnInit(): void {
    this.getMesAnnoncesData();
  }

  getMesAnnoncesData() {
    this.loadingService.show(); // Show loader at start
    this.dataService.getMesAnnonces().subscribe({
      next: (res) => {
        if (res && typeof res === 'object' && 'data' in res) {
          this.annonces = res.data;
        } else {
          console.error('Format inattendu :', res);
          this.annonces = [];
        }
        this.loadingService.hide(); // Hide loader after data is loaded
      },
      error: () => {
        this.loadingService.hide(); // Hide loader on error
      }
    });
  }

  goToAnnonceDetails(id: string) {
    this.router.navigate(['/mon-annonce', id]);
  }
}