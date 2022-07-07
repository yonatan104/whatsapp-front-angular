import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {
  private _imgUrl$ = new BehaviorSubject<string>('')
  public imgUrl$ = this._imgUrl$.asObservable()

  constructor() { }
  public async uploadImg(ev: any) {
  // Defining our variables
  const UPLOAD_PRESET = 'okr6cxy4' // Insert yours
  const CLOUD_NAME = 'dfhp1qewd' // Insert yours
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
  const FORM_DATA = new FormData();
  // Building the request body
  FORM_DATA.append('file', ev.target.files[0])
  FORM_DATA.append('upload_preset', UPLOAD_PRESET)
  // Sending a post method request to Cloudniarys' API
  try {
    const res = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: FORM_DATA
    })
    const { url } = await res.json()
    this._imgUrl$.next(url) 
    return url 

  } catch (err) {
    console.error('ERROR!', err)
  }
}

}
