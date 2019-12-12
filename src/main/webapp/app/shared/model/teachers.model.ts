import { ICourses } from 'app/shared/model/courses.model';

export interface ITeachers {
  id?: number;
  name?: string;
  degree?: string;
  email?: string;
  photo?: string;
  about?: string;
  courses?: ICourses[];
}

export class Teachers implements ITeachers {
  constructor(
    public id?: number,
    public name?: string,
    public degree?: string,
    public email?: string,
    public photo?: string,
    public about?: string,
    public courses?: ICourses[]
  ) {}
}
