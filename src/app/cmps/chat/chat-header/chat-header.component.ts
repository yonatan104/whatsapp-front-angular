import { Component, Input, OnInit } from '@angular/core';
import { CallRequest } from 'src/app/models/call-request';
import { Contact } from 'src/app/models/contact.model';
import { CallService } from 'src/app/services/call.service';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.scss']
})
export class ChatHeaderComponent implements OnInit {
  constructor(private callService: CallService, private contactService: ContactService) { }
  @Input() contact!: Contact
  ngOnInit(): void {
    console.log('contact999', this.contact);

  }
  onVideoCall() {
    const loggedUser = this.contactService.getLoggedinUser() as Contact
    if (!this.contact._id || !loggedUser._id) return
    console.log('request to call video', this.contact.name);
    const callRqs: CallRequest = {
      toUserId: this.contact._id,
      fromUser: {
        _id: loggedUser._id,
        name: loggedUser.name,
        imgUrl: loggedUser.imgUrl,
        peerId: ''
      },
      isVideo: true
    }
    this.callService.callRequest(callRqs)
  }
  
  
  



}
