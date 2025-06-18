import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { RepportedAnnoncesService } from 'src/app/service/repported-annonces.service';
import { DetailAnnonceService } from 'src/app/service/detail-annonce.service';
import { LoadingService } from 'src/app/services/loading.service'; // Add this import

@Component({
  selector: 'app-repported-annonces',
  templateUrl: './repported-annonces.component.html',
  styleUrls: ['./repported-annonces.component.css']
})
export class RepportedAnnoncesComponent implements OnInit {
  annonces: any;
  error: string | null = null;

  constructor(
    private dataService: RepportedAnnoncesService,
    private router: Router,
    private loadingService: LoadingService // Inject LoadingService
  ) {}

  ngOnInit(): void {
    this.getMesAnnoncesData();
  }

  getMesAnnoncesData() {
    this.loadingService.show(); // Show loader at start
    this.dataService.getRepportedAnnonces().subscribe({
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
    this.router.navigate(['/admin/repported-annonces', id]);
  }
}