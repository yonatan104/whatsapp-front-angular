import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-contact-app',
  templateUrl: './contact-app.component.html',
  styleUrls: ['./contact-app.component.scss']
})
export class ContactAppComponent implements OnInit {

  constructor(private contactService: ContactService, private webSocketService: WebSocketService) { }

  contacts$!: Observable<Contact[]>

  ngOnInit(): void {
    console.log('hello ');

    this.contactService.query()
    this.contacts$ = this.contactService.contacts$


    this.webSocketService.listen('new-message').subscribe((data) => {
      console.log('data',data);
      
      this.contactService.refreshLoggedUser()
      console.log('hihihihihihiihihihi');

    })
  }




}
