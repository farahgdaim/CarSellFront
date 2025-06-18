import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailAnnonceService } from 'src/app/service/detail-annonce.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service'; // Add this import

@Component({
  selector: 'app-achat-vehicule',
  templateUrl: './achat-vehicule.component.html',
  styleUrls: ['./achat-vehicule.component.css']
})
export class AchatVehiculeComponent implements OnInit {
  annonce: any = { images: [] };
  user: any = null;
  constructor(
    private authService: AuthService, 
    private route: ActivatedRoute,
    private annonceService: DetailAnnonceService,
    private loadingService: LoadingService // Inject LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingService.show(); // Show loader at start
    this.getAnnonceDetail();
    this.getUserDetail();
  }

  getAnnonceDetail() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.annonceService.getAnnonceById(id).subscribe({
      next: (res: any) => {
        this.annonce = res.data;
        this.loadingService.hide(); // Hide loader after data is loaded
      },
      error: () => {
        this.loadingService.hide(); // Hide loader on error
      }
    });
  }

  getUserDetail() {
    this.authService.getUser().subscribe({
      next: (res: any) => {
        this.user = res.data;
        this.loadingService.hide(); // Hide loader after user is loaded
      },
      error: () => {
        this.loadingService.hide(); // Hide loader on error
      }
    });
  }
}
