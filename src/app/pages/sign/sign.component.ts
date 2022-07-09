import { Component, OnInit, Input } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { CloudinaryService } from 'src/app/services/cloudinary.service';
import { Subscription } from 'rxjs';
import { ContactService } from 'src/app/services/contact.service';
import { ActivatedRoute, Router } from '@angular/router'
@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent implements OnInit {

  constructor(private cloudinaryService: CloudinaryService, private contactservice: ContactService, private router: Router,) { }
  contact = { name: '', password: '' , imgUrl:'', lastMsgTimeStemp: ''} as Contact
  imgUrl = null as any
  subImg !: Subscription
  ngOnInit(): void {
    console.log('this.contact ', this.contact);

  }

  onFileSelected(event: any) {
    this.cloudinaryService.uploadImg(event)
    this.subImg = this.cloudinaryService.imgUrl$.subscribe(imgUrl => {
      console.log('imgUrl', imgUrl);

      this.imgUrl = imgUrl
      this.contact.imgUrl = imgUrl
    })
  }

  async onSignUp() {
    try {
      await this.contactservice.signUp(this.contact)
      this.router.navigateByUrl('/contact')

    } catch (error) {
      console.log('can not add contact');

    }
  }

  ngOnDestroy(): void {
    // this.subImg.unsubscribe()
  }
}
