import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, identity, lastValueFrom, map, toArray } from 'rxjs';
import { Contact } from '../models/contact.model';
import { environment } from '../../environments/environment';
import { WebSocketService } from './web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private _contacts$ = new BehaviorSubject<Contact[]>([])
  public contacts$ = this._contacts$.asObservable()



  private _STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

  BASE_URL =
    environment.production
      ? '/api'
      : 'http://localhost:3030/api'


  constructor(private http: HttpClient, private webSocketService: WebSocketService) { }

  public query() {
    this.http.get(this.BASE_URL + '/user', { params: { logedInUserId: this.getLoggedinUser()._id } })
      .subscribe(value => {
        this._contacts$.next(value as Contact[])
      })
  }

  public updateUser(user: Contact) {
    this.http.put(this.BASE_URL + '/user/' + user._id, user).subscribe(v => {
      console.log('v', v);
    })
  }

  public async getById(_id: string) {
    return await lastValueFrom(this.http.get(this.BASE_URL + '/user/' + _id)) as Contact
  }

  public async refreshLoggedUser() {
    const loggedUser = this.getLoggedinUser() as Contact
    const newLoggedUser = await this.getById(loggedUser._id as string)
    this.saveLocalUser(newLoggedUser as Contact)
  }


  public async signup(userCred: Contact) {
    const user = await lastValueFrom(this.http.post(this.BASE_URL + '/auth/signup', userCred))
    this.setUserSocket(user as Contact)
    return this.saveLocalUser(user as Contact)
  }

  public async login(userCred: Contact) {
    const user = await lastValueFrom(this.http.post(this.BASE_URL + '/auth/login', userCred))
    this.setUserSocket(user as Contact)
    return this.saveLocalUser(user as Contact)
  }

  public async logout() {
    sessionStorage.removeItem(this._STORAGE_KEY_LOGGEDIN_USER)
    return await lastValueFrom(this.http.post(this.BASE_URL + '/auth/logout', {}))
  }

  public setUserSocket(user: Contact | undefined) {
    const loggedUser = user ? user : this.getLoggedinUser() as Contact
    if (!loggedUser || !loggedUser._id) return console.error('can not get logged in user!!')
    this.webSocketService.emit('set-user-socket', loggedUser._id)
  }

  public saveLocalUser(user: Contact) {
    sessionStorage.setItem(this._STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
  }


  public getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(this._STORAGE_KEY_LOGGEDIN_USER) || '')
  }


}


