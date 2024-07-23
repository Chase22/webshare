import Peer from "peerjs";
import type { DataConnection } from "peerjs";
import {generate} from "randomstring";

export const ID_PREFIX = "webshare-";

export class PeerWrapper {
  private readonly onStateChanged: (state: PeerState) => void;
  private readonly onMessage: (message: string) => void;

  private dataConnection?: DataConnection = undefined;

  private peer: Peer;

  public constructor(
    onStateChanged: (state: PeerState) => void,
    onIdChanged: (id: string) => void,
    onMessage: (message: string) => void
  ) {
    this.onStateChanged = onStateChanged;
    this.onMessage = onMessage;
    let idSuffix = generate({
      length: 7,
      charset: "hex",
      capitalization: "lowercase"
    });
    const id = ID_PREFIX + idSuffix;

    onIdChanged(idSuffix)

    this.peer = new Peer(id);
    this.peer.on("open", (id) => {
      console.info(id)
      this.onStateChanged(PeerState.Open);
    });
    this.peer.on("connection", (connection) => {
      this.setDataConnection(connection);
      this.onStateChanged(PeerState.Connected);
    });
    this.peer.on("disconnected", () => this.onStateChanged(PeerState.Open));
    this.peer.on("close", () => this.onStateChanged(PeerState.Opening));
    this.peer.on("error", (err) => {
      console.error(err)
      this.onStateChanged(PeerState.Error);
    });
  }

  public connect(id: string) {
    this.onStateChanged(PeerState.Connecting);
    this.setDataConnection(this.peer.connect(id));
  }

  private setDataConnection(dataConnection: DataConnection) {
    this.dataConnection = dataConnection;
    this.dataConnection.on("open", () => this.onStateChanged(PeerState.Connected));
    this.dataConnection.on("error", (err) => {
      console.error(err)
      this.onStateChanged(PeerState.Error);
    });
    this.dataConnection.on("data", (data) => {
      console.log(data);
      this.onMessage(data as string);
    });

  }

  public send(data: string) {
    if (this.dataConnection) {
      console.log(`Sending ${data}`)
      this.dataConnection.send(data);
    } else {
      console.error("No data connection")
    }
  }
}

export enum PeerState {
  Opening,
  Open,
  Connecting,
  Connected,
  Error
}