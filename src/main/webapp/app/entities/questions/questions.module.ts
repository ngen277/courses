import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoursesSharedModule } from 'app/shared/shared.module';
import { QuestionsComponent } from './questions.component';
import { QuestionsDetailComponent } from './questions-detail.component';
import { QuestionsUpdateComponent } from './questions-update.component';
import { QuestionsDeleteDialogComponent } from './questions-delete-dialog.component';
import { questionsRoute } from './questions.route';

@NgModule({
  imports: [CoursesSharedModule, RouterModule.forChild(questionsRoute)],
  declarations: [QuestionsComponent, QuestionsDetailComponent, QuestionsUpdateComponent, QuestionsDeleteDialogComponent],
  entryComponents: [QuestionsDeleteDialogComponent]
})
export class CoursesQuestionsModule {}
