import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChatRoom } from '../models/chat-room';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private _chatRoom$ = new BehaviorSubject<ChatRoom>({} as ChatRoom)
  public chatRoom$ = this._chatRoom$.asObservable()

  BASE_URL =
    environment.production
      ? '/api'
      : 'http://localhost:3030/api'

  constructor(private http: HttpClient) { }
  

  public getById(_id:string){
    this.http.get(this.BASE_URL + '/chatRoom/' + _id).subscribe(value => this._chatRoom$.next(value as ChatRoom))
  }

  public save(chatRoom: ChatRoom){
    console.log("🚀 ~ file: chat-room.service.ts ~ line 29 ~ ChatService ~ save ~ chatRoom", chatRoom)
    if(chatRoom._id) this.http.put(this.BASE_URL+ '/chatRoom', chatRoom).subscribe(value=> this._chatRoom$.next(value as ChatRoom))
    else this.http.post(this.BASE_URL+ '/chatRoom', chatRoom).subscribe(value=> this._chatRoom$.next(value as ChatRoom))
  }

  public getEmptyChatRoom(){
    return { 
      usersIds: [], 
      messages : [] 
    }
  }

  

  
}
