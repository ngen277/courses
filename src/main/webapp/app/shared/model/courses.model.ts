import { IStudentsCourses } from 'app/shared/model/students-courses.model';
import { ICourseParts } from 'app/shared/model/course-parts.model';
import { ITeachers } from 'app/shared/model/teachers.model';

export interface ICourses {
  id?: number;
  name?: string;
  annotation?: string;
  fullDescription?: string;
  pictureLink?: string;
  period?: number;
  userCourses?: IStudentsCourses[];
  courseParts?: ICourseParts[];
  teachers?: ITeachers;
}

export class Courses implements ICourses {
  constructor(
    public id?: number,
    public name?: string,
    public annotation?: string,
    public fullDescription?: string,
    public pictureLink?: string,
    public period?: number,
    public userCourses?: IStudentsCourses[],
    public courseParts?: ICourseParts[],
    public teachers?: ITeachers
  ) {}
}
