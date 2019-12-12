import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { StudentsTests } from 'app/shared/model/students-tests.model';
import { StudentsTestsService } from './students-tests.service';
import { StudentsTestsComponent } from './students-tests.component';
import { StudentsTestsDetailComponent } from './students-tests-detail.component';
import { StudentsTestsUpdateComponent } from './students-tests-update.component';
import { IStudentsTests } from 'app/shared/model/students-tests.model';

@Injectable({ providedIn: 'root' })
export class StudentsTestsResolve implements Resolve<IStudentsTests> {
  constructor(private service: StudentsTestsService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IStudentsTests> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((studentsTests: HttpResponse<StudentsTests>) => studentsTests.body));
    }
    return of(new StudentsTests());
  }
}

export const studentsTestsRoute: Routes = [
  {
    path: '',
    component: StudentsTestsComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'StudentsTests'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: StudentsTestsDetailComponent,
    resolve: {
      studentsTests: StudentsTestsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'StudentsTests'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: StudentsTestsUpdateComponent,
    resolve: {
      studentsTests: StudentsTestsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'StudentsTests'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: StudentsTestsUpdateComponent,
    resolve: {
      studentsTests: StudentsTestsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'StudentsTests'
    },
    canActivate: [UserRouteAccessService]
  }
];
