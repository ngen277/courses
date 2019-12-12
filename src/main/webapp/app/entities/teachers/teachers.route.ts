import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Teachers } from 'app/shared/model/teachers.model';
import { TeachersService } from './teachers.service';
import { TeachersComponent } from './teachers.component';
import { TeachersDetailComponent } from './teachers-detail.component';
import { TeachersUpdateComponent } from './teachers-update.component';
import { ITeachers } from 'app/shared/model/teachers.model';

@Injectable({ providedIn: 'root' })
export class TeachersResolve implements Resolve<ITeachers> {
  constructor(private service: TeachersService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITeachers> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((teachers: HttpResponse<Teachers>) => teachers.body));
    }
    return of(new Teachers());
  }
}

export const teachersRoute: Routes = [
  {
    path: '',
    component: TeachersComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Teachers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TeachersDetailComponent,
    resolve: {
      teachers: TeachersResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Teachers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TeachersUpdateComponent,
    resolve: {
      teachers: TeachersResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Teachers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TeachersUpdateComponent,
    resolve: {
      teachers: TeachersResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Teachers'
    },
    canActivate: [UserRouteAccessService]
  }
];
