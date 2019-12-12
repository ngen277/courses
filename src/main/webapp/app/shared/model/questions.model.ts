import { IAnswers } from 'app/shared/model/answers.model';
import { ICourseParts } from 'app/shared/model/course-parts.model';

export interface IQuestions {
  id?: number;
  content?: string;
  answers?: IAnswers[];
  courseParts?: ICourseParts;
}

export class Questions implements IQuestions {
  constructor(public id?: number, public content?: string, public answers?: IAnswers[], public courseParts?: ICourseParts) {}
}
