import { Lot } from './Lot';
import { SocialNetwork } from './SocialNetwork';
import { Speaker } from './Speaker';

export interface Event {
  id: number;
  local: string;
  eventDate?: Date;
  theme: string;
  amountPeople: number;
  imageUrl: string;
  phone: string;
  email: string;
  lots: Lot[];
  socialNetworks: SocialNetwork[];
  speakerEvents: Speaker[];
}
