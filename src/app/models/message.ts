export interface IMessage {
  clientuniqueid: string;
  userName: string;
  toUsername: string;
  device: DeviceType;
  message: string;
}

export enum DeviceType {
  Desktop = 'Desktop',
  Mobile = 'Mobile'
}