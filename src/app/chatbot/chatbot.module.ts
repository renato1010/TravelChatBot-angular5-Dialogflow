import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatbotService } from '../chatbot.service';
import { ChatDialogComponent } from '../chat/chat-dialog/chat-dialog.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [ChatDialogComponent],
  providers: [ChatbotService],
  exports: [ChatDialogComponent]
})
export class ChatbotModule {}
