import { Component, Input, OnInit } from '@angular/core';
import { ChatRoom } from 'src/app/models/chat-room';
import { Contact } from 'src/app/models/contact.model';
import { Message } from 'src/app/models/message';
import { ChatService } from 'src/app/services/chat-room.service';
import { ContactService } from 'src/app/services/contact.service';
import { UtilService } from 'src/app/services/util.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'chat-footer',
  templateUrl: './chat-footer.component.html',
  styleUrls: ['./chat-footer.component.scss']
})
export class ChatFooterComponent implements OnInit {

  constructor(
    private contactService: ContactService,
    private utilService: UtilService,
    private chatService: ChatService,
    private webSocketService: WebSocketService
  ) { }

  loggedUser: Contact = this.contactService.getLoggedinUser()
  message: Message = {
    fromUser: {
      name: this.loggedUser.name,
      imgUrl: this.loggedUser.imgUrl,
      userId: this.loggedUser._id || ''
    },
    text: ''
  }
  @Input() chatRoom!: ChatRoom
  ngOnInit(): void {
  }
  async onSendMsg() {
    this.message._id = this.utilService.makeId()
    this.message.createAt = Date.now()
    this.chatRoom.messages.push({ ...this.message })
    this.webSocketService.emit('send-message', this.chatRoom)
    this.chatService.save(this.chatRoom)
    this.message.text = ''
  }

}
