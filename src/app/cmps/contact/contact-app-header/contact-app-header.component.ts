import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { Router } from '@angular/router'
@Component({
  selector: 'contact-app-header',
  templateUrl: './contact-app-header.component.html',
  styleUrls: ['./contact-app-header.component.scss']
})
export class ContactAppHeaderComponent implements OnInit {
  

  constructor(private contactService: ContactService, private router: Router) { }
  imgUrl: string = this.contactService.getLoggedinUser().imgUrl
  ngOnInit(): void {
  }

  onLogout(){
    this.contactService.logout()
    this.router.navigateByUrl('')
  }

}
