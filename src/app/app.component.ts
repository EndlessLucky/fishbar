import { Component } from '@angular/core';
import { MessagingService } from './core/services/messaging.service';

@Component({
  selector: 'fishbar-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  message;
  constructor(
    private messagingService: MessagingService
  ) { }

  ngOnInit() {
    const userId = 'user001';
    this.messagingService.requestPermission(userId)
    this.messagingService.receiveMessage()
    this.message = this.messagingService.currentMessage
  }
}
