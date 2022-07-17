import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
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


  public getById(_id: string) {
    this.http.get(this.BASE_URL + '/chatRoom/' + _id).subscribe(value => this._chatRoom$.next(value as ChatRoom))
  }

  public async save(chatRoom: ChatRoom) {
    if (chatRoom._id) {
      const savedChatRoom = await lastValueFrom(this.http.put(this.BASE_URL + '/chatRoom/' + chatRoom._id, chatRoom)) as ChatRoom
      this._chatRoom$.next(savedChatRoom)
    } else {
      const savedChatRoom = await lastValueFrom(this.http.post(this.BASE_URL + '/chatRoom', chatRoom)) as ChatRoom
      this._chatRoom$.next(savedChatRoom)
    }
  }

  public getEmptyChatRoom() {
    return {
      usersIds: [],
      messages: []
    }
  }






}
