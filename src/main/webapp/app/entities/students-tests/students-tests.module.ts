import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoursesSharedModule } from 'app/shared/shared.module';
import { StudentsTestsComponent } from './students-tests.component';
import { StudentsTestsDetailComponent } from './students-tests-detail.component';
import { StudentsTestsUpdateComponent } from './students-tests-update.component';
import { StudentsTestsDeleteDialogComponent } from './students-tests-delete-dialog.component';
import { studentsTestsRoute } from './students-tests.route';

@NgModule({
  imports: [CoursesSharedModule, RouterModule.forChild(studentsTestsRoute)],
  declarations: [StudentsTestsComponent, StudentsTestsDetailComponent, StudentsTestsUpdateComponent, StudentsTestsDeleteDialogComponent],
  entryComponents: [StudentsTestsDeleteDialogComponent]
})
export class CoursesStudentsTestsModule {}
