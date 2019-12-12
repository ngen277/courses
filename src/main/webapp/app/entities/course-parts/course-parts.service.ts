import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICourseParts } from 'app/shared/model/course-parts.model';

type EntityResponseType = HttpResponse<ICourseParts>;
type EntityArrayResponseType = HttpResponse<ICourseParts[]>;

@Injectable({ providedIn: 'root' })
export class CoursePartsService {
  public resourceUrl = SERVER_API_URL + 'api/course-parts';

  constructor(protected http: HttpClient) {}

  create(courseParts: ICourseParts): Observable<EntityResponseType> {
    return this.http.post<ICourseParts>(this.resourceUrl, courseParts, { observe: 'response' });
  }

  update(courseParts: ICourseParts): Observable<EntityResponseType> {
    return this.http.put<ICourseParts>(this.resourceUrl, courseParts, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICourseParts>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICourseParts[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
