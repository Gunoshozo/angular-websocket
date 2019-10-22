import { Component, OnInit } from '@angular/core';
import { WebSocketAPI } from '../../WebSocketAPI';
import {Message} from '../model/message';
import { FormGroup,FormControl } from '@angular/forms';

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class notification implements OnInit{

  title = 'springboot-websocket';
  private webSocketAPI: WebSocketAPI;
  private messages: Message[] =[];
  private form: FormGroup;
  private UserId: string;



  ngOnInit(){
    this.form = new FormGroup({
      text: new FormControl()
    })
    this.UserId ='0';
    this.webSocketAPI = new WebSocketAPI(this);
    this.connect()
  }

  connect(){
    this.webSocketAPI._connect();
  }

  disconnect(){
    this.webSocketAPI._disconnect();
  }

  sendMessage(){
    let message: Message = {text: this.form.value.text,toId:this.UserId }
    this.webSocketAPI._send(message);
  }

  handleMessage(message){
    let messageResult: Message = JSON.parse(message.body);
    this.messages.unshift(messageResult)
    //this.messages.push(messageResult)
    console.log(this.messages);  
  }
}

