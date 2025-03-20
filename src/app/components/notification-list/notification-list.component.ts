import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html'
})
export class NotificationListComponent implements OnInit {
  notifications: any[] = [];
  error: string | null = null;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications() {
    this.notificationService.getNotifications().subscribe({
      next: (res: any) => {
        this.notifications = (res.data || []).sort((a: any, b: any) => {
          if (a.statut === 'non_lu' && b.statut !== 'non_lu') return -1;
          if (a.statut !== 'non_lu' && b.statut === 'non_lu') return 1;
          return 0;
        });
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des notifications.';
        console.error(err);
      }
    });
  }

  markNotificationAsRead(index: number) {
    this.notificationService.markAsRead(index).subscribe({
      next: (res: any) => {
        this.loadNotifications(); // Refresh notifications after marking one as read
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
