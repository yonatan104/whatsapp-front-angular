import { Component, OnInit } from '@angular/core'
import Peer from 'peerjs'
import { CallRequest } from 'src/app/models/call-request'
import { CallService } from 'src/app/services/call.service'
import { WebSocketService } from 'src/app/services/web-socket.service'
@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.scss']
})
export class VideoCallComponent implements OnInit {

  private peer: Peer
  peerIdShare: string = ''
  peerId: string = ''
  private lazyStream: any
  currentPeer: any
  private peerList: Array<any> = []
  isVideoOpen: Boolean = false
  isMyScreenShared: Boolean = false
  secondUserId: string = ''

  constructor(private callService: CallService, private webSocketService: WebSocketService) {
    this.peer = new Peer()
  }

  ngOnInit(): void {
    this.getPeerId()
    this.callService.callRequest$.subscribe(callRqs => {
      if (!this.peerId) return
      this.secondUserId = callRqs.toUserId
      const callRqsToSend = callRqs
      callRqsToSend.fromUser.peerId = this.peerId
      this.callService.sendRequest(callRqsToSend)
      this.isVideoOpen = true
    })
    this.webSocketService.listen('incoming-call-Request').subscribe((incomingCallRqs: any) => {
      this.isVideoOpen = true
      this.secondUserId = incomingCallRqs.toUserId
      const peerIdShare = incomingCallRqs.fromUser.peerId as string
      this.callPeer(peerIdShare)
    })

    this.webSocketService.listen('got-disconnect-peer-call').subscribe(userIdToDisconnect => {
      console.log('got-disconnect-peer-call')
      const stream = this.lazyStream
      stream.getTracks().forEach(function (track: { stop: () => void }) {
        track.stop();
      });
      this.peer.disconnect()
      this.peer.destroy()
      this.isVideoOpen = false
      this.peer = new Peer()
    })
  }

  disconnect() {
    this.peer.disconnect()
    this.peer.destroy()
    const stream = this.lazyStream
    stream.getTracks().forEach(function (track: { stop: () => void }) {
      track.stop();
    });
    this.peer = new Peer()
    this.isVideoOpen = false
    this.webSocketService.emit('disconnect-peer-call', { toUserId: this.secondUserId })
  }

  private getPeerId = () => {
    this.peer.on('open', (id) => {
      this.peerId = id
    })


    this.peer.on('call', (call) => {
      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      }).then((stream) => {
        this.lazyStream = stream

        call.answer(stream)
        call.on('stream', (remoteStream) => {
          if (!this.peerList.includes(call.peer)) {
            this.streamRemoteVideo(remoteStream)
            this.currentPeer = call.peerConnection
            this.peerList.push(call.peer)
          }
        })
      }).catch(err => {
        console.log(err + 'Unable to get media')
      })
    })
  }

  connectWithPeer(): void {
    this.callPeer(this.peerIdShare)
  }


  private callPeer(id: string): void {
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then((stream) => {
      this.lazyStream = stream

      const call = this.peer.call(id, stream)
      call.on('stream', (remoteStream) => {
        if (!this.peerList.includes(call.peer)) {
          this.streamRemoteVideo(remoteStream)
          this.currentPeer = call.peerConnection
          this.peerList.push(call.peer)
        }
      })
    }).catch(err => {
      console.log(err + 'Unable to connect')
    })
  }


  async playVideoFromCamera() {
    try {
      const constraints = { 'video': true, 'audio': false }
      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      const videoElement = document.querySelector('video#localVideo')
      // @ts-ignore
      videoElement.srcObject = stream
    } catch (error) {
      console.error('Error opening video camera.', error)
    }
  }

  

  private streamRemoteVideo(stream: any): void {
    this.playVideoFromCamera()

    const video = document.createElement('video')
    video.classList.add('video')
    video.srcObject = stream
    video.play()

    document.getElementById('remote-video')?.append(video)
  }

  screenShare(): void {
    this.shareScreen()
    this.isMyScreenShared = true
  }
  private shareScreen(): void {
    // @ts-ignore
    navigator.mediaDevices.getDisplayMedia({
      video: {
        // @ts-ignore
        cursor: 'always'
      },
      audio: {
        echoCancellation: true,
        noiseSuppression: true
      }
    }).then(stream => {
      const videoTrack = stream.getVideoTracks()[0]
      videoTrack.onended = () => {
        this.stopScreenShare()
      }

      const sender = this.currentPeer.getSenders().find((s: { track: { kind: string } }) => s.track.kind === videoTrack.kind)
      sender.replaceTrack(videoTrack)
    }).catch(err => {
      console.log('Unable to get display media ' + err)
    })
  }

  stopScreenShare(): void {
    const videoTrack = this.lazyStream.getVideoTracks()[0]
    const sender = this.currentPeer.getSenders().find((s: { track: { kind: any } }) => s.track.kind === videoTrack.kind)
    sender.replaceTrack(videoTrack)
    this.isMyScreenShared = false
  }

}
