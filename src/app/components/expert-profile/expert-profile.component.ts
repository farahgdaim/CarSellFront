import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpertService } from '../../services/expert.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-expert-profile',
  templateUrl: './expert-profile.component.html',
  styleUrls: ['./expert-profile.component.css']
})
export class ExpertProfileComponent implements OnInit {
  expert: any = null;
  user: any = null; // The detailed user profile info corresponding to the expert
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private expertService: ExpertService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (!userId) {
      this.error = 'Identifiant de l\'expert manquant.';
      return;
    }
    // Option 1: If the expert object is passed in router state:
    if (history.state && history.state.expert) {
      this.expert = history.state.expert;
      this.loadUserProfile(userId);
    } else {
      // Option 2: Fetch expert info based on userId
      // For this example, we'll assume that the expert data is tied to the user's ID.
      // You might need to create a new backend endpoint if needed.
      this.userService.getUserById(userId).subscribe({
        next: (res: any) => {
          this.user = res.data || res;
          // Here you might also fetch the expert data corresponding to this user.
          // For simplicity, we'll assume the user data contains expert details.
          this.expert = this.user.expert || null;
        },
        error: (err) => {
          this.error = 'Erreur lors du chargement du profil expert.';
          console.error(err);
        }
      });
    }
  }

  loadUserProfile(userId: string): void {
    this.userService.getUserById(userId).subscribe({
      next: (res: any) => {
        this.user = res.data || res;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement du profil utilisateur.';
        console.error(err);
      }
    });
  }
}
