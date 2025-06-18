import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {
  notifications: any[] = [];
  error: string | null = null;

  constructor(
    private notificationService: NotificationService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications() {
    this.loadingService.show();
    this.notificationService.getNotifications().subscribe({
      next: (res: any) => {
        let unsorted = res.data || [];
        // Conserver l'index original pour chaque notification
        unsorted = unsorted.map((notification: any, index: number) => ({
          ...notification,
          originalIndex: index
        }));
        // Trier en plaçant les notifications non lues en premier
        this.notifications = unsorted.sort((a: any, b: any) => {
          if (a.statut === 'non_lu' && b.statut !== 'non_lu') return -1;
          if (a.statut !== 'non_lu' && b.statut === 'non_lu') return 1;
          return 0;
        });
        this.loadingService.hide();
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des notifications.';
        console.error(err);
        this.loadingService.hide();
      }
    });
  }
  
  markNotificationAsRead(notification: any) {
    this.loadingService.show();
    // Utiliser originalIndex pour marquer comme lue
    this.notificationService.markAsRead(notification.originalIndex).subscribe({
      next: (res: any) => {
        this.loadNotifications(); // Recharge les notifications après mise à jour
        this.loadingService.hide();
      },
      error: (err: any) => {
        console.error(err);
        this.loadingService.hide();
      }
    });
  }
  
}
