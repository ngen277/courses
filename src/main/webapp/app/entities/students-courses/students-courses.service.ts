import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IStudentsCourses } from 'app/shared/model/students-courses.model';

type EntityResponseType = HttpResponse<IStudentsCourses>;
type EntityArrayResponseType = HttpResponse<IStudentsCourses[]>;

@Injectable({ providedIn: 'root' })
export class StudentsCoursesService {
  public resourceUrl = SERVER_API_URL + 'api/students-courses';

  constructor(protected http: HttpClient) {}

  create(studentsCourses: IStudentsCourses): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(studentsCourses);
    return this.http
      .post<IStudentsCourses>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(studentsCourses: IStudentsCourses): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(studentsCourses);
    return this.http
      .put<IStudentsCourses>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IStudentsCourses>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IStudentsCourses[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(studentsCourses: IStudentsCourses): IStudentsCourses {
    const copy: IStudentsCourses = Object.assign({}, studentsCourses, {
      registrationDate:
        studentsCourses.registrationDate != null && studentsCourses.registrationDate.isValid()
          ? studentsCourses.registrationDate.format(DATE_FORMAT)
          : null,
      endDate: studentsCourses.endDate != null && studentsCourses.endDate.isValid() ? studentsCourses.endDate.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.registrationDate = res.body.registrationDate != null ? moment(res.body.registrationDate) : null;
      res.body.endDate = res.body.endDate != null ? moment(res.body.endDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((studentsCourses: IStudentsCourses) => {
        studentsCourses.registrationDate = studentsCourses.registrationDate != null ? moment(studentsCourses.registrationDate) : null;
        studentsCourses.endDate = studentsCourses.endDate != null ? moment(studentsCourses.endDate) : null;
      });
    }
    return res;
  }
}
