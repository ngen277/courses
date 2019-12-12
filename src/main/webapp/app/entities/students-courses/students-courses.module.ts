import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoursesSharedModule } from 'app/shared/shared.module';
import { StudentsCoursesComponent } from './students-courses.component';
import { StudentsCoursesDetailComponent } from './students-courses-detail.component';
import { StudentsCoursesUpdateComponent } from './students-courses-update.component';
import { StudentsCoursesDeleteDialogComponent } from './students-courses-delete-dialog.component';
import { studentsCoursesRoute } from './students-courses.route';

@NgModule({
  imports: [CoursesSharedModule, RouterModule.forChild(studentsCoursesRoute)],
  declarations: [
    StudentsCoursesComponent,
    StudentsCoursesDetailComponent,
    StudentsCoursesUpdateComponent,
    StudentsCoursesDeleteDialogComponent
  ],
  entryComponents: [StudentsCoursesDeleteDialogComponent]
})
export class CoursesStudentsCoursesModule {}
