import { Component, OnInit } from '@angular/core';
import Peer from 'peerjs';
import { CallRequest } from 'src/app/models/call-request';
import { CallService } from 'src/app/services/call.service';
import { WebSocketService } from 'src/app/services/web-socket.service';
@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.scss']
})
export class VideoCallComponent implements OnInit {

  private peer: Peer;
  peerIdShare: string = '';
  peerId: string = '';
  private lazyStream: any;
  currentPeer: any;
  private peerList: Array<any> = [];
  isVideoOpen: Boolean = false

  constructor(private callService: CallService, private webSocketService: WebSocketService) {
    this.peer = new Peer();
  }

  ngOnInit(): void {
    this.getPeerId()
    this.callService.callRequest$.subscribe(callRqs => {
      console.log('new call');
      if (!this.peerId) return
      const callRqsToSend = callRqs
      callRqsToSend.fromUser.peerId = this.peerId
      this.callService.sendRequest(callRqsToSend)
      this.isVideoOpen = true
    })
    this.webSocketService.listen('new-call-Request').subscribe((incomingCallRqs: any)=>{
      console.log('incomingCallRqs', incomingCallRqs);
      this.isVideoOpen = true
      const peerIdShare = incomingCallRqs.fromUser.peerId as string
      this.callPeer(peerIdShare)

    })
    
  }

  private getPeerId = () => {
    this.peer.on('open', (id) => {
      this.peerId = id;
    });

    this.peer.on('call', (call) => {
      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      }).then((stream) => {
        this.lazyStream = stream;

        call.answer(stream);
        call.on('stream', (remoteStream) => {
          if (!this.peerList.includes(call.peer)) {
            this.streamRemoteVideo(remoteStream);
            this.currentPeer = call.peerConnection;
            this.peerList.push(call.peer);
          }
        });
      }).catch(err => {
        console.log(err + 'Unable to get media');
      });
    });
  }

  connectWithPeer(): void {
    this.callPeer(this.peerIdShare);
  }


  private callPeer(id: string): void {
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then((stream) => {
      this.lazyStream = stream;

      const call = this.peer.call(id, stream);
      call.on('stream', (remoteStream) => {
        if (!this.peerList.includes(call.peer)) {
          this.streamRemoteVideo(remoteStream);
          this.currentPeer = call.peerConnection;
          this.peerList.push(call.peer);
        }
      });
    }).catch(err => {
      console.log(err + 'Unable to connect');
    });
  }


  private streamRemoteVideo(stream: any): void {
    const video = document.createElement('video');
    video.classList.add('video');
    video.srcObject = stream;
    video.play();

    document.getElementById('remote-video')?.append(video)
  }

  screenShare(): void {
    this.shareScreen();
  }
  private shareScreen(): void {
    // @ts-ignore
    navigator.mediaDevices.getDisplayMedia({
      video: {
        // cursor: 'always'
      },
      audio: {
        echoCancellation: true,
        noiseSuppression: true
      }
    }).then(stream => {
      const videoTrack = stream.getVideoTracks()[0];
      videoTrack.onended = () => {
        this.stopScreenShare();
      };

      const sender = this.currentPeer.getSenders().find((s: { track: { kind: string; }; }) => s.track.kind === videoTrack.kind);
      sender.replaceTrack(videoTrack);
    }).catch(err => {
      console.log('Unable to get display media ' + err);
    });
  }

  private stopScreenShare(): void {
    const videoTrack = this.lazyStream.getVideoTracks()[0];
    const sender = this.currentPeer.getSenders().find((s: { track: { kind: any; }; }) => s.track.kind === videoTrack.kind);
    sender.replaceTrack(videoTrack);
  }

}
