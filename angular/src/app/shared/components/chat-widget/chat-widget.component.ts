import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PortfolioService } from '../../../core/services/portfolio.service';
import { ChatRequest } from '../../../core/models/portfolio.model';

type MessageRole = 'bot' | 'user';

interface UiChatMessage {
  role: MessageRole;
  text: string;
  meta?: string;
}

@Component({
  selector: 'app-chat-widget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.scss']
})
export class ChatWidgetComponent {
  isOpen = false;
  isSending = false;
  draft = '';
  visitorName = '';
  visitorContact = '';
  messages: UiChatMessage[] = [
    {
      role: 'bot',
      text: 'Hi, I am Nuru\'s portfolio assistant. Ask about skills, experience, availability, or leave your contact and I can help route your message.'
    }
  ];

  constructor(private portfolioService: PortfolioService) {}

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  send(): void {
    const trimmed = this.draft.trim();
    if (!trimmed || this.isSending) {
      return;
    }

    this.messages.push({ role: 'user', text: trimmed });
    this.isSending = true;

    const payload: ChatRequest = {
      message: trimmed,
      visitorName: this.visitorName.trim() || undefined,
      visitorContact: this.visitorContact.trim() || undefined
    };

    this.draft = '';

    this.portfolioService.sendChatMessage(payload).subscribe({
      next: (response) => {
        const data = response.data;
        this.messages.push({
          role: 'bot',
          text: data?.reply || 'I could not generate a reply just now.',
          meta: data?.notificationSent ? 'Phone notification sent.' : undefined
        });
        this.isSending = false;
      },
      error: () => {
        this.messages.push({
          role: 'bot',
          text: 'The assistant is unavailable right now. Please use email or try again shortly.'
        });
        this.isSending = false;
      }
    });
  }
}
