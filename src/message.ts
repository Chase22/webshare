export enum MessageDirection {
  Incoming,
  Outgoing
}

export interface Message {
  data: string
  direction: MessageDirection
}