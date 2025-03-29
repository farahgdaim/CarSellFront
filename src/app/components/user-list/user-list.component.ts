import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  error: string | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (res: any) => {
        this.users = res.data || [];
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des utilisateurs.';
        console.error(err);
      }
    });
  }

  goToProfile(user: any): void {
    const userId = user._id || user.id;
    if (!userId) {
      console.error("User ID is undefined for user:", user);
      return;
    }
    this.router.navigate(['/profile', userId]);
  }
  
}
