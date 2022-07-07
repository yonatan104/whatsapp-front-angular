import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-app',
  templateUrl: './contact-app.component.html',
  styleUrls: ['./contact-app.component.scss']
})
export class ContactAppComponent implements OnInit {

  constructor(private contactService: ContactService) { }

  contacts$!:Observable<Contact[]>

  ngOnInit(): void {
    this.contactService.query()
    this.contacts$ = this.contactService.contacts$
  }

}
