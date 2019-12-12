import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoursesSharedModule } from 'app/shared/shared.module';
import { AnswersComponent } from './answers.component';
import { AnswersDetailComponent } from './answers-detail.component';
import { AnswersUpdateComponent } from './answers-update.component';
import { AnswersDeleteDialogComponent } from './answers-delete-dialog.component';
import { answersRoute } from './answers.route';

@NgModule({
  imports: [CoursesSharedModule, RouterModule.forChild(answersRoute)],
  declarations: [AnswersComponent, AnswersDetailComponent, AnswersUpdateComponent, AnswersDeleteDialogComponent],
  entryComponents: [AnswersDeleteDialogComponent]
})
export class CoursesAnswersModule {}
