import { Moment } from 'moment';
import { IStudentsTests } from 'app/shared/model/students-tests.model';
import { IStudents } from 'app/shared/model/students.model';
import { ICourses } from 'app/shared/model/courses.model';

export interface IStudentsCourses {
  id?: number;
  status?: string;
  registrationDate?: Moment;
  endDate?: Moment;
  userTests?: IStudentsTests[];
  students?: IStudents;
  courses?: ICourses;
}

export class StudentsCourses implements IStudentsCourses {
  constructor(
    public id?: number,
    public status?: string,
    public registrationDate?: Moment,
    public endDate?: Moment,
    public userTests?: IStudentsTests[],
    public students?: IStudents,
    public courses?: ICourses
  ) {}
}
