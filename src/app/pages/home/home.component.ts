import {Component, OnInit, ViewChild} from '@angular/core';
import { SELECT_MULTIPLE_PANEL_PADDING_X } from '@angular/material/select';
import { Track } from 'ngx-audio-player/public_api';
import { AudioPlayerComponent } from 'projects/ngx-audio-player/src/public_api';
import {Stomp} from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import {ChatMessage} from '../../model/ChatMessage';
import {ChatService} from '../../service/chat.service';
import {TokenService} from '../../auth/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit{

 form: any = {};
 chatMessageForm: ChatMessage;

  title = 'grokonez';
  description = 'Angular-WebSocket Demo';

  greetings: string[] = [];
  disabled = true;
  name: string;
  private stompClient;
  constructor(private chatService: ChatService,
              private tokenService: TokenService) { }
  setConnected(connected: boolean) {
    console.log('setConnected');
    this.disabled = !connected;

    if (connected) {
      this.greetings = [];
    }
  }

  connect() {

    console.log('vao connect khong?');
    const socket = new SockJS('http://localhost:8080/gkz-stomp-endpoint');
    this.stompClient = Stomp.over(socket);

    const _this = this;
    this.stompClient.connect({}, function(frame) {
      _this.setConnected(true);
      console.log('Connected: ' + frame);

      _this.stompClient.subscribe('/topic/hi', function(hello) {
        console.log('SUBORAI', hello);
        console.log('content ===' ,JSON.parse(hello.body).content);
        _this.form.content = JSON.parse(hello.body).content;
        console.log('form.content', _this.form.content)
        _this.chatMessageForm = new ChatMessage(
          _this.form.content,
        )

        console.log('chatMForm = ',_this.chatMessageForm)

          _this.chatService.chatMessage(_this.chatMessageForm).subscribe(data =>{
            console.log('data = ', data)
          })

        _this.showGreeting(JSON.parse(hello.body).content);
      });
    });
  }

  disconnect() {
    console.log('Disconnect');
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }

    this.setConnected(false);
    console.log('Disconnected!');
  }

  sendName() {
    this.stompClient.send(
      '/gkz/hello',
      {},
      JSON.stringify({ name: this.name })
    );
  }

  showGreeting(message) {
    this.greetings.push(message);
  }

  ngOnInit(): void {
    this.connect();
    this.tokenService.getToken();
    console.log('token = ', this.tokenService.getToken())
  }
  // private fmaBaseUrl = 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music';
  //
  // @ViewChild("player")
  // advancedPlayer: AudioPlayerComponent;
  //
  // // Single
  // singleTrack: Track[] = [
  //   {
  //     title: 'In Love | A Himitsu feat. Nori',
  //     link:
  //       'https://dl.dropboxusercontent.com/s/9v0psowra7ekhxo/A%20Himitsu%20-%20In%20Love%20%28feat.%20Nori%29.flac?dl=0'
  //   }
  // ];
  //
  // // Multiple
  // multiple: Track[] = [
  //   {
  //     title: 'In Love | A Himitsu feat. Nori',
  //     link:
  //       'https://dl.dropboxusercontent.com/s/9v0psowra7ekhxo/A%20Himitsu%20-%20In%20Love%20%28feat.%20Nori%29.flac?dl=0'
  //   },
  //   {
  //     title: 'Cartoon – On & On (feat. Daniel Levi) [NCS Release]',
  //     link:
  //       'https://dl.dropboxusercontent.com/s/w99exjxnwoqwz0e/Cartoon-on-on-feat-daniel-levi-ncs-release.mp3?dl=0'
  //   }
  // ];
  //
  // msaapPlaylist: Track[] = this.multiple;
  //
  // msaapDisplayTitle = true;
  // msaapDisplayPlayList = true;
  // pageSizeOptions = [2, 4, 6];
  //
  // msaapDisplayVolumeControls = true;
  // msaapDisablePositionSlider = false;
  //
  // msaapTableHeader: string = 'My Playlist';
  // msaapColumnHeader: string = 'My Music';
  //
  //
  // // Start: Required for demo purpose
  //
  // msaapPlaylist2: Track[] = [
  //   {
  //     title: '1400 (by Yung Kartz)',
  //     link: `${this.fmaBaseUrl}/no_curator/Yung_Kartz/August_2018/Yung_Kartz_-_10_-_1400.mp3`
  //   },
  //   {
  //     title: 'Epic Song (by BoxCat Games)',
  //     link: `${this.fmaBaseUrl}/ccCommunity/BoxCat_Games/Nameless_The_Hackers_RPG_Soundtrack/BoxCat_Games_-_10_-_Epic_Song.mp3`
  //   }
  // ];
  //
  // msaapPlaylist3: Track[] = [
  //   {
  //     title: 'Hachiko (The Faithful Dog) (by The Kyoto)',
  //     link: `${this.fmaBaseUrl}/ccCommunity/The_Kyoto_Connection/Wake_Up/The_Kyoto_Connection_-_09_-_Hachiko_The_Faithtful_Dog.mp3`
  //   },
  //   {
  //     title: 'Starling (by Podington Bear)',
  //     link: `${this.fmaBaseUrl}/Music_for_Video/Podington_Bear/Solo_Instruments/Podington_Bear_-_Starling.mp3`
  //   }
  // ];
  //
  // currentTrack: Track = null;
  // currentTime: any;
  //
  // appendTracksToPlaylistDisable = false;
  // counter = 1;
  //
  // onEnded(event) {
  //   console.log(event);
  //   // your logic which needs to
  //   // be triggered once the
  //   // track ends goes here.
  //
  //   // example
  //   this.currentTrack = null;
  // }
  //
  // logCurrentTrack() {
  //   this.advancedPlayer.audioPlayerService.getCurrentTrack().subscribe(track => {
  //     this.currentTrack = track;
  //   });
  // }
  //
  // logCurrentTime() {
  //   this.advancedPlayer.audioPlayerService.getCurrentTime().subscribe(time => {
  //     this.currentTime = time;
  //   });
  // }
  //
  // consoleLogCurrentData() {
  //   // logCurrentTrack();
  //   // logCurrentTime();
  //   // Make sure to subscribe (by calling above methods)
  //   // before getting the data
  //   console.log(this.currentTrack.title + ' : ' + this.currentTime);
  // }
  //
  // appendTracksToPlaylist() {
  //
  //   if (this.msaapPlaylist.length === 1) {
  //     this.msaapPlaylist = this.multiple;
  //   } else if (this.msaapPlaylist.length === 2) {
  //     this.msaapPlaylist2.map(track => {
  //       this.msaapPlaylist.push(track);
  //     });
  //     this.advancedPlayer.audioPlayerService.setPlaylist(this.msaapPlaylist);
  //   } else if (this.msaapPlaylist.length === 4) {
  //     this.msaapPlaylist3.map(track => {
  //       this.msaapPlaylist.push(track);
  //     });
  //     this.advancedPlayer.audioPlayerService.setPlaylist(this.msaapPlaylist);
  //     this.appendTracksToPlaylistDisable = true;
  //   }
  // }
  //
  // setSingleTrack() {
  //   this.msaapPlaylist = this.singleTrack;
  //   this.appendTracksToPlaylistDisable = false;
  // }
  //
  // changeMsaapDisplayTitle(event) {
  //   this.msaapDisplayTitle = event.checked;
  // }
  //
  // changeMsaapDisplayPlayList(event) {
  //   this.msaapDisplayPlayList = event.checked;
  // }
  //
  // changeMsaapDisplayVolumeControls(event) {
  //   this.msaapDisplayVolumeControls = event.checked;
  // }
  //
  // changeMsaapDisablePositionSlider(event) {
  //   this.msaapDisablePositionSlider = event.checked;
  // }
  // // End: Required for demo purpose
}
