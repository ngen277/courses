import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CorrectCodes } from 'app/shared/model/correct-codes.model';
import { CorrectCodesService } from './correct-codes.service';
import { CorrectCodesComponent } from './correct-codes.component';
import { CorrectCodesDetailComponent } from './correct-codes-detail.component';
import { CorrectCodesUpdateComponent } from './correct-codes-update.component';
import { ICorrectCodes } from 'app/shared/model/correct-codes.model';

@Injectable({ providedIn: 'root' })
export class CorrectCodesResolve implements Resolve<ICorrectCodes> {
  constructor(private service: CorrectCodesService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICorrectCodes> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((correctCodes: HttpResponse<CorrectCodes>) => correctCodes.body));
    }
    return of(new CorrectCodes());
  }
}

export const correctCodesRoute: Routes = [
  {
    path: '',
    component: CorrectCodesComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CorrectCodes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CorrectCodesDetailComponent,
    resolve: {
      correctCodes: CorrectCodesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CorrectCodes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CorrectCodesUpdateComponent,
    resolve: {
      correctCodes: CorrectCodesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CorrectCodes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CorrectCodesUpdateComponent,
    resolve: {
      correctCodes: CorrectCodesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CorrectCodes'
    },
    canActivate: [UserRouteAccessService]
  }
];
