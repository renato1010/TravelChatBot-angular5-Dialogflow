import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { scan, concat } from 'rxjs/operators';
import { Message, ChatbotService } from '../../chatbot.service';

@Component({
  selector: 'chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent implements OnInit {
  mensajes: Observable<Message[]>;
  inputValue: string;
  constructor(public chat: ChatbotService) {}

  ngOnInit() {
    this.mensajes = this.chat.conversacion.asObservable().pipe(scan((acc, val) => acc.concat(val)));
  }

  enviarMensaje() {
    this.chat.converse(this.inputValue);
    this.inputValue = '';
  }
}
