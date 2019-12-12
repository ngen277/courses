import { Moment } from 'moment';
import { ICorrectCodes } from 'app/shared/model/correct-codes.model';
import { IStudentsCourses } from 'app/shared/model/students-courses.model';

export interface IStudents {
  id?: number;
  login?: string;
  password?: string;
  surname?: string;
  name?: string;
  middlename?: string;
  ngroup?: string;
  registrationDate?: Moment;
  sex?: string;
  email?: string;
  isAdmin?: boolean;
  studentCode?: ICorrectCodes;
  userCourses?: IStudentsCourses[];
}

export class Students implements IStudents {
  constructor(
    public id?: number,
    public login?: string,
    public password?: string,
    public surname?: string,
    public name?: string,
    public middlename?: string,
    public ngroup?: string,
    public registrationDate?: Moment,
    public sex?: string,
    public email?: string,
    public isAdmin?: boolean,
    public studentCode?: ICorrectCodes,
    public userCourses?: IStudentsCourses[]
  ) {
    this.isAdmin = this.isAdmin || false;
  }
}
