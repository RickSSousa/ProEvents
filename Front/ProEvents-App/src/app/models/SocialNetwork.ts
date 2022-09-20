import { Speaker } from './Speaker';

export interface SocialNetwork {
  id: number;
  nome: string;
  url: string;
  eventId?: number;
  speakerId?: number;
}
