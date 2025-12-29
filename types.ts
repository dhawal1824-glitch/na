
export type Role = 'user' | 'assistant';

export interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp: Date;
  isThinking?: boolean;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  isThinkingMode: boolean;
}
