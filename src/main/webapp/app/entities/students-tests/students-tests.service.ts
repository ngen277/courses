import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IStudentsTests } from 'app/shared/model/students-tests.model';

type EntityResponseType = HttpResponse<IStudentsTests>;
type EntityArrayResponseType = HttpResponse<IStudentsTests[]>;

@Injectable({ providedIn: 'root' })
export class StudentsTestsService {
  public resourceUrl = SERVER_API_URL + 'api/students-tests';

  constructor(protected http: HttpClient) {}

  create(studentsTests: IStudentsTests): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(studentsTests);
    return this.http
      .post<IStudentsTests>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(studentsTests: IStudentsTests): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(studentsTests);
    return this.http
      .put<IStudentsTests>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IStudentsTests>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IStudentsTests[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(studentsTests: IStudentsTests): IStudentsTests {
    const copy: IStudentsTests = Object.assign({}, studentsTests, {
      lastTestDate:
        studentsTests.lastTestDate != null && studentsTests.lastTestDate.isValid() ? studentsTests.lastTestDate.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.lastTestDate = res.body.lastTestDate != null ? moment(res.body.lastTestDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((studentsTests: IStudentsTests) => {
        studentsTests.lastTestDate = studentsTests.lastTestDate != null ? moment(studentsTests.lastTestDate) : null;
      });
    }
    return res;
  }
}
