import { SocialNetwork } from './SocialNetwork';

export interface Speaker {
  id: number;
  name: string;
  curriculum: string;
  imageUrl: string;
  phone: string;
  socialNetworks: SocialNetwork[];
  speakerEvents: Event[];
}
