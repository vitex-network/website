class WS {
    constructor(url, overtime = 60000) {
        this.url = url;
        this.overtime = overtime;
        this.socket = null;
        this.connect();
    }

    connect() {
        let wsCtor = window["MozWebSocket"] ? MozWebSocket : WebSocket;
        this.socket = new wsCtor(this.url);
        this.socket.onopen = this.onOpen.bind(this);
        this.socket.onmessage = this.onUpdate.bind(this);
        this.socket.onerror = this.onError.bind(this);
        this.socket.onclose = this.onClose.bind(this); 
    }

    onOpen() {
        console.log("WebSocket Connection Open.");
    }

    onUpdate(msg) {
        let command = JSON.parse(msg.data);
        console.log(command);

    }

    send(msg) {
        this.socket.send(JSON.stringify(msg));
    }
    
    onError(event) {
        console.error("WebSocket error observed:", event);
    }
    
      
    onClose() {
        console.log("WebSocket is closed now.");
    }
    
    close() {
        this.socket.close();
        console.log("WebSocket Connection Closed.");
    }
    
    reconnect() {
        console.log("try to reconnect");
        this.close();
        this.connect();
    }
}