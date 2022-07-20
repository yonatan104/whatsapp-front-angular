import { Component, Input, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.scss']
})
export class ChatHeaderComponent implements OnInit {

  constructor() { }
  @Input() contact!: Contact
  ngOnInit(): void {
    console.log('contact999', this.contact);
    
  }

}
