import { appConfig } from "src/config";
import { PriceSocketDataI } from "src/interfaces/socket/socket.interface";
import { Event, MessageEvent, WebSocket } from "ws";
export class PriceSocket {

    private instance: WebSocket;

    constructor() { this.open(); }

    open() {
        this.instance = new WebSocket(appConfig.bitmapSocketUrl);
        this.instance.onopen = this.onOpen;
        this.instance.onclose = this.onClose;
        this.instance.onmessage = this.onMessage;
        this.instance.onerror = this.onError;
    }

    onMessage(ev: MessageEvent) {
        const price: PriceSocketDataI = JSON.parse(ev.data.toString());
        // console.log("❗ ~ file: index.ts:33 ~ PriceSocket ~ onMessage ~ price:", price)
    }

    onOpen(ev: Event) {
        ev.target.send(JSON.stringify({ "op": "subscribe", "args": ["orderBookL2_25:XBTUSD"] }));
    }

    onClose() {
        console.log("❗ ~ file: index.ts:26 ~ PriceSocket ~ onClose ~ onClose")
    }

    onError() {
        console.log("❗ ~ file: index.ts:30 ~ PriceSocket ~ onError ~ onError")
    }
}