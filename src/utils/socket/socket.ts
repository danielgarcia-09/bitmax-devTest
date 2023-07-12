import { IMessageEvent, w3cwebsocket as WebSocket } from "websocket";

class Socket {
    private socket: WebSocket | null;

    constructor() {
        this.socket = null;
    }

    public connect(url: string) {
        if (!this.socket) {
            this.socket = new WebSocket(url)
        }
    }

    public disconnect() {
        this.socket && this.socket.close()
    }

    public onOpen(callback: () => void) {
        this.socket && (console.log("socket connected successfully!"), this.socket.onopen = callback)
    }

    public onClose(callback: () => void) {
        this.socket && (this.socket.onclose = callback)
    }

    public onError(callback: () => void) {
        this.socket && (this.socket.onerror = callback)
    }

    public sendMessage(data: object) {
        this.socket && this.socket.send(JSON.stringify(data))
    }

    public onMessage(callback: (data: any) => void) {
        this.socket && (this.socket.onmessage = (event: IMessageEvent) => {
            callback(JSON.parse(event.data.toString()))
        })
    }
}

export default Socket;