import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ChatRoom } from 'src/app/models/chat-room';
import { Contact } from 'src/app/models/contact.model';
import { ChatService } from 'src/app/services/chat-room.service';
import { ContactService } from 'src/app/services/contact.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

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
    private route: ActivatedRoute,
    private webSocketService: WebSocketService
  ) { }
  contact!: Contact
  chatRoom!: ChatRoom
  // sub!: Observable<Router>
  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      this.loadChatRoom()
    })
    this.webSocketService.listen('new-message').subscribe((data) => {
      const chatRoom = data as ChatRoom
      if (this.chatRoom._id === chatRoom._id) this.chatRoom = chatRoom
      this.contactService.refreshLoggedUser()
    })
  }

  async loadChatRoom() {
    console.log('hello111');
    
    const contactId = this.route.snapshot.queryParams['contact']
    const chatRoomId = this.route.snapshot.queryParams['chatRoom']
    if (!contactId || !chatRoomId) {
      console.log('cancel!');

      return
    }
    this.chatService.getById(chatRoomId)
    this.chatService.chatRoom$.subscribe(value => {
      this.chatRoom = value
    })
    
     this.contact = await this.contactService.getById(contactId) 
    // this.contactService.contactById$.subscribe(v => this.contact =v)
    // console.log("🚀 ~ file: chat.component.ts ~ line 47 ~ ChatComponent ~ loadChatRoom ~ this.contact", this.contact)
  }
}
