import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Courses } from 'app/shared/model/courses.model';
import { CoursesService } from './courses.service';
import { CoursesComponent } from './courses.component';
import { CoursesDetailComponent } from './courses-detail.component';
import { CoursesUpdateComponent } from './courses-update.component';
import { ICourses } from 'app/shared/model/courses.model';

@Injectable({ providedIn: 'root' })
export class CoursesResolve implements Resolve<ICourses> {
  constructor(private service: CoursesService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICourses> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((courses: HttpResponse<Courses>) => courses.body));
    }
    return of(new Courses());
  }
}

export const coursesRoute: Routes = [
  {
    path: '',
    component: CoursesComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Courses'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CoursesDetailComponent,
    resolve: {
      courses: CoursesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Courses'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CoursesUpdateComponent,
    resolve: {
      courses: CoursesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Courses'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CoursesUpdateComponent,
    resolve: {
      courses: CoursesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Courses'
    },
    canActivate: [UserRouteAccessService]
  }
];
