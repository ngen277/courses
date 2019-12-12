import { IQuestions } from 'app/shared/model/questions.model';
import { IStudentsTests } from 'app/shared/model/students-tests.model';
import { ICourses } from 'app/shared/model/courses.model';

export interface ICourseParts {
  id?: number;
  npart?: number;
  downloadLink?: string;
  downloadDescription?: string;
  testName?: string;
  testQuestionCount?: number;
  questions?: IQuestions[];
  userTests?: IStudentsTests[];
  courses?: ICourses;
}

export class CourseParts implements ICourseParts {
  constructor(
    public id?: number,
    public npart?: number,
    public downloadLink?: string,
    public downloadDescription?: string,
    public testName?: string,
    public testQuestionCount?: number,
    public questions?: IQuestions[],
    public userTests?: IStudentsTests[],
    public courses?: ICourses
  ) {}
}
