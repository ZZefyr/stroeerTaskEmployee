import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notifications: string[] = [];
  notificationType: string;

  add(notification: string, type: string): void {
    if (this.notifications.length > 0) {
      this.clear();
    }
    this.notifications.push(notification);
    this.notificationType = type;
  }

  clear(): void {
    this.notifications = [];
  }

}
