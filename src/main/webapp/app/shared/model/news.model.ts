import { Moment } from 'moment';

export interface INews {
  id?: number;
  title?: string;
  date?: Moment;
  body?: string;
  author?: string;
}

export class News implements INews {
  constructor(public id?: number, public title?: string, public date?: Moment, public body?: string, public author?: string) {}
}
