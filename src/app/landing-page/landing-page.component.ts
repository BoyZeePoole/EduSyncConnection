import { Component, OnInit, NgZone } from '@angular/core';
import { SignalrService } from '../services/signalr-service';
import { confirm } from "tns-core-modules/ui/dialogs";
import {
  getBoolean,
  setBoolean,
  getNumber,
  setNumber,
  getString,
  setString,
  hasKey,
  remove,
  clear
} from "tns-core-modules/application-settings";
import { IMessage, DeviceType } from '../models/message';
@Component({
  selector: 'ns-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private signalrService: SignalrService, private _ngZone: NgZone) { }
  token: string;
  userName: string;

  connectionStatus: boolean = false;
  ngOnInit(): void {
    this.token = getString("token");
    this.userName = getString("username");
    if (this.token != '') {
      this.signalrService.activeSignalR(this.token);
      this.subscribeToEvents();
    }

  }

  private subscribeToEvents(): void {
    this.signalrService.messageReceived.subscribe((message: any) => {
      let ccc = message.arguments[0];
      if (ccc.device == DeviceType.Desktop) {
        this.confirm();
      }
    });
    this.signalrService.connectionStatus.subscribe((status: boolean) => {
      this._ngZone.run(() => {
        this.connectionStatus = status;
      });
    });
  }

  alert(message: string) {
    return alert({
      title: "Edu Sync",
      okButtonText: "OK",
      message: message
    });
  }
  confirm() {
    let options = {
      title: "Loggin into EduSync",
      message: "Are you trying to login to EduSync?",
      okButtonText: "Yes",
      cancelButtonText: "No",
      neutralButtonText: "Cancel"
    };

    confirm(options).then((result: boolean) => {
      let message: IMessage = {
        clientuniqueid: '',
        device: DeviceType.Mobile,
        userName: this.userName,
        toUsername: this.userName,
        message: result ? 'true' : 'false'
      }
      this.signalrService.broadcastChartData(message);
    });
  }
}
