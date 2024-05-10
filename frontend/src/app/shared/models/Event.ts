export interface Event {
  _id: string;
  bookTitle: string;
  author: string;
  coverUrl: string;
  date: string;
  description: string;
  meetingLink: string;
  comments: [string];
}
