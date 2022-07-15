import { Component, Input, OnInit } from '@angular/core'
import { Observable } from 'rxjs';
import { ChatRoom } from 'src/app/models/chat-room';
import { Contact } from 'src/app/models/contact.model'
import { ChatService } from 'src/app/services/chat-room.service'
@Component({
  selector: 'contact-preview',
  templateUrl: './contact-preview.component.html',
  styleUrls: ['./contact-preview.component.scss']
})
export class ContactPreviewComponent implements OnInit {

  constructor(private chatService: ChatService) { }
  @Input() contact!: Contact
  chatRoom!: Observable<ChatRoom>
  ngOnInit(): void {
  }
  handleClick() {
    console.log('contact', this.contact);
    const { chatRoomsIds } = this.contact
    if (!chatRoomsIds) {
      const chatRoomToSave = this.chatService.getEmptyChatRoom() as ChatRoom
      this.chatService.save(chatRoomToSave)
      this.chatRoom = this.chatService.chatRoom$
    }
  }

}
