import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {notification} from './components/notification/notification.component';

export class WebSocketAPI{
    webSocketEndPOint: string = 'http://localhost:8080/ws';
    topic: string = "/topic/send";
    stompClient: any;
    appComponent: notification;
    constructor(appComponent: notification){
        this.appComponent = appComponent;
    }
    _connect(){
        console.log("Init WebSock Connection");
        let ws = new SockJS(this.webSocketEndPOint);
        this.stompClient = Stomp.over(ws);
        const _this = this;
        _this.stompClient.connect({},function(frame){
        _this.stompClient.subscribe(_this.topic,function(sdkEvent){
            _this.onMessageRecieved(sdkEvent);
            });
        },this.errorCallBack);
    }

    _disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnected");
    }

    errorCallBack(error) {
        console.log("errorCallBack -> " + error)
        setTimeout(() => {
            this._connect();
        }, 5000);
    }

    _send(message) {
        console.log("calling logout api via web socket");
        this.stompClient.send("/app/sendmessage", {}, JSON.stringify(message));
    }
    

    onMessageRecieved(message){
        console.log("Msg recieved from sevr :: " + JSON.parse(message.body)['text']);
        this.appComponent.handleMessage(message);
    }

}