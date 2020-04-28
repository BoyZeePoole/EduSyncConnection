declare var require;
var WebSocket = require('nativescript-websockets');

import { Injectable, EventEmitter } from "@angular/core";
import { SignalrCore } from 'nativescript-signalr-core/angular';
import { SignalRCoreRHeaders } from "nativescript-signalr-core/signalr-core.common";
import { IMessage, DeviceType } from "../models/message";

@Injectable({
  providedIn: "root"
})
export class SignalrService {

  messageReceived = new EventEmitter<IMessage>();
  connectionStatus = new EventEmitter<boolean>();
  header: SignalRCoreRHeaders;
  signalrCore;
  token;
  private deviceType = DeviceType;

  message: IMessage = {
    userName: '',
    clientuniqueid: 'nothing',
    device: this.deviceType.Mobile,
    message: 'empty message',
    toUsername: ''
  };

  constructor() {

  }
  activeSignalR(token) {
    this.createConnection(token);
    this.registerOnServerEvents();
    this.startConnection();
  }
  public ngOnInit() {
  }

  createConnection(token) {
    this.signalrCore = new SignalrCore();
    this.header = new SignalRCoreRHeaders('access_token', token);
  }
  private registerOnServerEvents(): void {
    this.signalrCore.on('MessageReceived', (msg) => {
      this.messageReceived.emit(msg);
    });
    this.signalrCore.on('disconnected', (msg) => {
      this.connectionStatus.emit(false);
    });
  }
  startConnection() {
    this.signalrCore.start('http://10.0.2.2:56255/messageHub', this.header).then(
      (isConnected: boolean) => {
        this.connectionStatus.emit(isConnected);
      });
  }

  public broadcastChartData = (message: IMessage) => {
    this.message.userName = this.message.userName;
    this.message.toUsername = 'clintonp';
    this.message.message = ` Hi, I am ${this.message.userName}`;
    this.signalrCore.invoke('send', message);
  }

  stop() {
    this.signalrCore.close().then((res) => {
      console.log('closed...', res);
    });
  }
}