import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { Contact } from '../models/contact.model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ContactService {


  private _contacts$ = new BehaviorSubject<Contact[]>([])
  public contacts$ = this._contacts$.asObservable()

  BASE_URL =
    environment.production
      ? '/api/user'
      : 'http://localhost:3030/api/user/'

  constructor(private http: HttpClient) {}


  public query() {
    this.http.get(this.BASE_URL).subscribe(value => this._contacts$.next(value as Contact[])) 
  }


  

  

  
}
