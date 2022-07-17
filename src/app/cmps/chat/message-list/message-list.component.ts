import { Component, Input, OnInit } from '@angular/core';
import { ChatRoom } from 'src/app/models/chat-room';
import { Message } from 'src/app/models/message';

@Component({
  selector: 'message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {

  constructor() { }
  @Input() messages!: Message[]
  ngOnInit(): void {
  }

}
