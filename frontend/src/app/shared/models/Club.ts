import { Event } from './Event';

export interface Club {
  _id: string;
  name: string;
  scedule: string;
  description: string;
  admin: String;
  members: [String];
  events: [Event];
}
