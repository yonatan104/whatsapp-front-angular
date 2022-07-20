import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'message-preview',
  templateUrl: './message-preview.component.html',
  styleUrls: ['./message-preview.component.scss']
})
export class MessagePreviewComponent implements OnInit {

  constructor(private contactService: ContactService) { }
  @Input() message!: Message
  messageContent: string = ' '
  messageContainer: string = ' '
  ngOnInit(): void {
    if (this.message && this.contactService.getLoggedinUser()._id !== this.message.fromUser.userId) {
      this.messageContent = 'incoming-message'
      this.messageContainer = 'incoming-message-container'
    }
  }

}
