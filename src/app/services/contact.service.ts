import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { Contact } from '../models/contact.model';
import { environment } from '../../environments/environment';


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

  constructor(private http: HttpClient) { }

  public query() {
    this.http.get(this.BASE_URL + '/user').subscribe(value => this._contacts$.next(value as Contact[]))
  }
  public async signUp(userCred: Contact) {
    const user = await lastValueFrom(this.http.post(this.BASE_URL + '/auth/signup', userCred))
    return this.saveLocalUser(user as Contact)
  }

  public async logout() {
    sessionStorage.removeItem(this._STORAGE_KEY_LOGGEDIN_USER)
    return await lastValueFrom(this.http.post(this.BASE_URL + '/auth/logout', {}))
    //TODO: check this function 
  }

  public saveLocalUser(user: Contact) {
    sessionStorage.setItem(this._STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
  }

  public getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(this._STORAGE_KEY_LOGGEDIN_USER) || '')
  }


}


