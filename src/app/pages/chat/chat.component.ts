import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatRoom } from 'src/app/models/chat-room';
import { Contact } from 'src/app/models/contact.model';
import { ChatService } from 'src/app/services/chat-room.service';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(
    private chatService: ChatService,
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  contact!: Contact
  chatRoom!: ChatRoom
  ngOnInit(): void {
    this.loadChatRoom()
  }

  async loadChatRoom() {
    const contactId = this.route.snapshot.queryParams['contact']
    const chatRoomId = this.route.snapshot.queryParams['chatRoom']
    this.chatService.getById(chatRoomId)
    this.chatService.chatRoom$.subscribe(value => {
      this.chatRoom = value
    })
    this.contact = await this.contactService.getById(contactId) as Contact
  }


}
