import { Moment } from 'moment';
import { IStudentsCourses } from 'app/shared/model/students-courses.model';
import { ICourseParts } from 'app/shared/model/course-parts.model';

export interface IStudentsTests {
  id?: number;
  attemps?: number;
  percent?: number;
  lastTestDate?: Moment;
  studentsCourses?: IStudentsCourses;
  courseParts?: ICourseParts[];
}

export class StudentsTests implements IStudentsTests {
  constructor(
    public id?: number,
    public attemps?: number,
    public percent?: number,
    public lastTestDate?: Moment,
    public studentsCourses?: IStudentsCourses,
    public courseParts?: ICourseParts[]
  ) {}
}
