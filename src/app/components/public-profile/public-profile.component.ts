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
    console.log("logged in user:", this.loggedInUserId, "target user: ", userId);
    // Check if a conversation exists between logged-in user and the target user
    this.conversationService.getConversationBetweenUsers(this.loggedInUserId, userId).subscribe({
      next: (res: any) => {
        if (res && res.status === 200 && res.data) {
          console.log("conversation exists");
          // Navigate to the existing conversation
          const conversationId = res.data._id || res.data.id;
          console.log("conversation id: ", res.data);
          this.router.navigate(['/conversation', conversationId], { state: { conversation: res.data } });
        } else {
          console.log("conversation does not exist");
          // If no conversation exists, create a new one
          this.createNewConversation(userId);
        }
      },
      error: (err) => {
        // Handle the error when the conversation does not exist or another issue occurs
        console.log("Error or conversation not found");
        this.createNewConversation(userId);
      }
    });
  }

  private createNewConversation(userId: string): void {
    this.conversationService.createConversation(userId).subscribe({
      next: (createRes: any) => {
        const newConversation = createRes.data;
        const conversationId = newConversation._id || newConversation.id;
        this.router.navigate(['/conversation', conversationId], { state: { conversation: newConversation } });
      },
      error: (createErr) => {
        alert('Erreur lors de la création de la conversation.');
        console.error('Conversation creation error:', createErr);
      }
    });
  }

}
