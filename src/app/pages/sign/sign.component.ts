import { Component, OnInit, Input } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { CloudinaryService } from 'src/app/services/cloudinary.service';
import { Subscription } from 'rxjs';
import { ContactService } from 'src/app/services/contact.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent implements OnInit {

  constructor(private cloudinaryService: CloudinaryService, private contactservice: ContactService, private router: Router,) { }
  contact = { name: '', password: '', imgUrl: '', lastMsgTimeStemp: '' } as Contact
  imgUrl = null as any
  subImg !: Subscription
  isSignUp: boolean = true ;
  ngOnInit(): void {

  }

  onFileSelected(event: any) {
    this.cloudinaryService.uploadImg(event)
    this.subImg = this.cloudinaryService.imgUrl$.subscribe(imgUrl => {
      console.log('imgUrl', imgUrl);

      this.imgUrl = imgUrl
      this.contact.imgUrl = imgUrl
    })
  }
  onSubmit(){
    if (this.isSignUp) this.signup()
    else this.login()
  }

  async signup() {
    try {
      await this.contactservice.signup(this.contact)
      this.router.navigateByUrl('/contact')
    } catch (error) {
      console.log('can not signup');
    }
  }

  async login(){
    try {
      await this.contactservice.login(this.contact)
      this.router.navigateByUrl('/contact')
    } catch (error) {
      console.log('can not login');
    }
  }

  onToggleSignInUp() {
    this.isSignUp = !this.isSignUp
  }

  ngOnDestroy(): void {
    // this.subImg.unsubscribe()
  }
}
