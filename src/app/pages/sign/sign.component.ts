import { Component, OnInit, Input } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { CloudinaryService } from 'src/app/services/cloudinary.service';
import { Subscription } from 'rxjs';
import { ContactService } from 'src/app/services/contact.service';
import { Router } from '@angular/router'
import { WebSocketService } from 'src/app/services/web-socket.service';
@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent implements OnInit {

  constructor(
    private cloudinaryService: CloudinaryService,
    private contactservice: ContactService,
    private router: Router,
    private webSocketService: WebSocketService
  ) { }
  contact = { name: '', password: '', imgUrl: '', lastMsgTimeStemp: '' } as Contact
  imgUrl = null as any
  subImg !: Subscription
  isSignUp: boolean = true;
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
  onSubmit() {
    if (this.isSignUp) this.signup()
    else this.login()
  }

  async signup() {
    try {
      await this.contactservice.signup(this.contact)
      this.router.navigateByUrl('/contact')
      this.setUserSocket()
    } catch (error) {
      console.log('can not signup');
    }
  }

  async login() {
    try {
      await this.contactservice.login(this.contact)
      this.router.navigateByUrl('/contact')
      this.setUserSocket()
    } catch (error) {
      console.log('can not login');
    }
  }
  setUserSocket(){
    const loggedUser = this.contactservice.getLoggedinUser() as Contact
    if (!loggedUser || !loggedUser._id) return console.error('can not get logged in user!!')
    this.webSocketService.emit('set-user-socket', loggedUser._id)
  }

  onToggleSignInUp() {
    this.isSignUp = !this.isSignUp
  }

  ngOnDestroy(): void {
    // this.subImg.unsubscribe()
  }
}
