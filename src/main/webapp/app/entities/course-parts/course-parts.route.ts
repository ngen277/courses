import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CourseParts } from 'app/shared/model/course-parts.model';
import { CoursePartsService } from './course-parts.service';
import { CoursePartsComponent } from './course-parts.component';
import { CoursePartsDetailComponent } from './course-parts-detail.component';
import { CoursePartsUpdateComponent } from './course-parts-update.component';
import { ICourseParts } from 'app/shared/model/course-parts.model';

@Injectable({ providedIn: 'root' })
export class CoursePartsResolve implements Resolve<ICourseParts> {
  constructor(private service: CoursePartsService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICourseParts> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((courseParts: HttpResponse<CourseParts>) => courseParts.body));
    }
    return of(new CourseParts());
  }
}

export const coursePartsRoute: Routes = [
  {
    path: '',
    component: CoursePartsComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CourseParts'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CoursePartsDetailComponent,
    resolve: {
      courseParts: CoursePartsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CourseParts'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CoursePartsUpdateComponent,
    resolve: {
      courseParts: CoursePartsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CourseParts'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CoursePartsUpdateComponent,
    resolve: {
      courseParts: CoursePartsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CourseParts'
    },
    canActivate: [UserRouteAccessService]
  }
];
