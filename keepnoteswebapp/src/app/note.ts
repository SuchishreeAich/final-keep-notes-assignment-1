export class Note {
  id: Number;
  title: string;
  text: string;
  state: string;
  userId: string;
  createdOn: Date;
  modifiedOn: Date;
  isFavourite: Boolean;
  group: string;
  sharedUsers: Array<string>;

  constructor() {
    this.title = '';
    this.text = '';
    this.state = 'not-started';
    this.userId = '';
    this.createdOn = new Date();
    this.modifiedOn = new Date();
    this.isFavourite = false;
    this.group = '';
    this.sharedUsers = [];
  }
}
