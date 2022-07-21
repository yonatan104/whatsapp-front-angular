import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CallRequest } from '../models/call-request';
import { WebSocketService } from './web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class CallService {
  private _callRequest$ = new BehaviorSubject<CallRequest>({} as CallRequest)
  public callRequest$ = this._callRequest$.asObservable()
  constructor(private webSocketService: WebSocketService) { }

  public callRequest(callRqs: CallRequest) {
    this._callRequest$.next(callRqs)
  }

  public sendRequest(callRqs: CallRequest){
    this.webSocketService.emit('call-request', callRqs)
  }
}
