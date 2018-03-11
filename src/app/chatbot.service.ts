import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
// import { ApiAiClient } from 'api-ai-javascript';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class Message {
  constructor(public texto: string, public envia: string) {}
}

@Injectable()
export class ChatbotService {
  readonly token = environment.dialogflow.angularBot;
  readonly baseUrl = 'https://api.dialogflow.com/v1/query?v=20150910';
  // readonly cliente = new ApiAiClient({
  //   accessToken: this.token
  // });
  conversacion = new BehaviorSubject<Message[]>([]);
  constructor(private http: HttpClient) {
    console.log('token', this.token);
  }

  // envia y recibe mensajes via Dialogflow
  converse(msg: string) {
    const mensajeUsuario = new Message(msg, 'user');
    this.update(mensajeUsuario);

    return this.getResponse(msg).subscribe(res => {
      console.log('DialogRes', res);
      const speech = res['result'].fulfillment.speech;
      const botMessage = new Message(speech, 'bot');
      this.update(botMessage);
    });
  }

  public getResponse(query: string) {
    const data = {
      query: query,
      lang: 'es',
      sessionId: '12345'
    };
    return this.http.post(`${this.baseUrl}`, data, this.getHttpOptions() );
  }

  private getHttpOptions() {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    };
    return httpOptions;
  }

  // suma un mensaje a la conversación
  private update(msg: Message) {
    this.conversacion.next([msg]);
  }
}
