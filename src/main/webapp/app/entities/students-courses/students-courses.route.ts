import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { StudentsCourses } from 'app/shared/model/students-courses.model';
import { StudentsCoursesService } from './students-courses.service';
import { StudentsCoursesComponent } from './students-courses.component';
import { StudentsCoursesDetailComponent } from './students-courses-detail.component';
import { StudentsCoursesUpdateComponent } from './students-courses-update.component';
import { IStudentsCourses } from 'app/shared/model/students-courses.model';

@Injectable({ providedIn: 'root' })
export class StudentsCoursesResolve implements Resolve<IStudentsCourses> {
  constructor(private service: StudentsCoursesService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IStudentsCourses> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((studentsCourses: HttpResponse<StudentsCourses>) => studentsCourses.body));
    }
    return of(new StudentsCourses());
  }
}

export const studentsCoursesRoute: Routes = [
  {
    path: '',
    component: StudentsCoursesComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'StudentsCourses'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: StudentsCoursesDetailComponent,
    resolve: {
      studentsCourses: StudentsCoursesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'StudentsCourses'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: StudentsCoursesUpdateComponent,
    resolve: {
      studentsCourses: StudentsCoursesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'StudentsCourses'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: StudentsCoursesUpdateComponent,
    resolve: {
      studentsCourses: StudentsCoursesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'StudentsCourses'
    },
    canActivate: [UserRouteAccessService]
  }
];
