import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICorrectCodes } from 'app/shared/model/correct-codes.model';

type EntityResponseType = HttpResponse<ICorrectCodes>;
type EntityArrayResponseType = HttpResponse<ICorrectCodes[]>;

@Injectable({ providedIn: 'root' })
export class CorrectCodesService {
  public resourceUrl = SERVER_API_URL + 'api/correct-codes';

  constructor(protected http: HttpClient) {}

  create(correctCodes: ICorrectCodes): Observable<EntityResponseType> {
    return this.http.post<ICorrectCodes>(this.resourceUrl, correctCodes, { observe: 'response' });
  }

  update(correctCodes: ICorrectCodes): Observable<EntityResponseType> {
    return this.http.put<ICorrectCodes>(this.resourceUrl, correctCodes, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICorrectCodes>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICorrectCodes[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
