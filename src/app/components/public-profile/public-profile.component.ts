import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ConversationService } from '../../services/conversation.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './public-profile.component.html'
})
export class PublicProfileComponent implements OnInit {
  user: any = null;
  loggedInUserId: string = '';
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private conversationService: ConversationService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');

    // Load the target user's profile
    this.userService.getUserById(userId!).subscribe({
      next: (res: any) => {
        this.user = res.data || res;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement du profil.';
        console.error(err);
      }
    });

    // Get the logged-in user's ID
    this.authService.getUser().subscribe({
      next: (res: any) => {
        this.loggedInUserId = res.data.id ;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du profil connecté', err);
      }
    });
  }

  startConversation(userId: string): void {
    // Check if a conversation exists between the logged-in user and the target user
    this.conversationService.getConversationBetweenUsers(this.loggedInUserId, userId).subscribe({
      next: (res: any) => {
        if (res && res.status === 200 && res.data) {
          // Navigate to the existing conversation using the two user IDs
          const userId1 = res.data.Ref_id_user1;
          const userId2 = res.data.Ref_id_user2;
          this.router.navigate(['/conversation', userId1, userId2], { state: { conversation: res.data } });
        } else {
          // If no conversation exists, create a new one
          this.createNewConversation(userId);
        }
      },
      error: (err) => {
        // Handle the error when the conversation does not exist or another issue occurs
        console.error("Error or conversation not found", err);
        this.createNewConversation(userId);
      }
    });
  }
  
  private createNewConversation(userId: string): void {
    this.conversationService.createConversation(userId).subscribe({
      next: (createRes: any) => {
        const newConversation = createRes.data;
        const userId1 = newConversation.Ref_id_user1;
        const userId2 = newConversation.Ref_id_user2;
        this.router.navigate(['/conversation', userId1, userId2], { state: { conversation: newConversation } });
      },
      error: (createErr) => {
        alert('Erreur lors de la création de la conversation.');
        console.error('Conversation creation error:', createErr);
      }
    });
  }
  
}
