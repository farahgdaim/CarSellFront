import { Component, OnInit } from '@angular/core';
import { ExpertService } from '../../services/expert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-experts-list',
  templateUrl: './experts-list.component.html',
  styleUrls: ['./experts-list.component.css']
})
export class ExpertsListComponent implements OnInit {
  experts: any[] = [];
  error: string | null = null;

  constructor(private expertService: ExpertService, private router: Router) {}

  ngOnInit(): void {
    this.loadExperts();
  }

  loadExperts(): void {
    this.expertService.getAllExperts().subscribe({
      next: (res: any) => {
        this.experts = res.data || [];
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des experts.';
        console.error(err);
      }
    });
  }

  viewExpertProfile(expert: any): void {
    // Navigate to the expert's public profile page using their ID.
    // Here, we assume the expert object has a ref_id_utilisateur field which points to the user's ID.
    const expertUserId = expert.ref_id_utilisateur;
    if (!expertUserId) {
      alert('ID expert introuvable.');
      return;
    }
    this.router.navigate(['/expert-profile', expertUserId], { state: { expert } });
  }
}
