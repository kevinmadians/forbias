// Simulating a database with localStorage
export interface Message {
  id: string;
  recipientName: string;
  message: string;
  songId: string;
  songName: string;
  artistName: string;
  albumImage: string;
  createdAt: number;
  likes: number;
}

export function saveMessage(message: Omit<Message, 'id' | 'createdAt' | 'likes'>): Message {
  const messages = getMessages();
  const newMessage: Message = {
    ...message,
    id: Math.random().toString(36).substring(2, 9),
    createdAt: Date.now(),
    likes: 0,
  };
  
  messages.push(newMessage);
  localStorage.setItem('messages', JSON.stringify(messages));
  return newMessage;
}

export function getMessages(): Message[] {
  if (typeof window === 'undefined') return [];
  const messages = localStorage.getItem('messages');
  return messages ? JSON.parse(messages) : [];
}

export function getMessagesByRecipient(name: string): Message[] {
  return getMessages().filter(
    (message) => message.recipientName.toLowerCase() === name.toLowerCase()
  );
}

export function likeMessage(messageId: string): void {
  const messages = getMessages();
  const messageIndex = messages.findIndex((m) => m.id === messageId);
  
  if (messageIndex !== -1) {
    // Get liked messages from localStorage
    const likedMessages = JSON.parse(localStorage.getItem('likedMessages') || '[]');
    const hasLiked = likedMessages.includes(messageId);

    if (!hasLiked) {
      messages[messageIndex].likes += 1;
      likedMessages.push(messageId);
      localStorage.setItem('messages', JSON.stringify(messages));
      localStorage.setItem('likedMessages', JSON.stringify(likedMessages));
    }
  }
}

export function hasLikedMessage(messageId: string): boolean {
  if (typeof window === 'undefined') return false;
  const likedMessages = JSON.parse(localStorage.getItem('likedMessages') || '[]');
  return likedMessages.includes(messageId);
}