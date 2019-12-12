import { IQuestions } from 'app/shared/model/questions.model';

export interface IAnswers {
  id?: number;
  answerContent?: string;
  rightAnswer?: boolean;
  questions?: IQuestions;
}

export class Answers implements IAnswers {
  constructor(public id?: number, public answerContent?: string, public rightAnswer?: boolean, public questions?: IQuestions) {
    this.rightAnswer = this.rightAnswer || false;
  }
}
