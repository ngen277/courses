import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoursesSharedModule } from 'app/shared/shared.module';
import { CorrectCodesComponent } from './correct-codes.component';
import { CorrectCodesDetailComponent } from './correct-codes-detail.component';
import { CorrectCodesUpdateComponent } from './correct-codes-update.component';
import { CorrectCodesDeleteDialogComponent } from './correct-codes-delete-dialog.component';
import { correctCodesRoute } from './correct-codes.route';

@NgModule({
  imports: [CoursesSharedModule, RouterModule.forChild(correctCodesRoute)],
  declarations: [CorrectCodesComponent, CorrectCodesDetailComponent, CorrectCodesUpdateComponent, CorrectCodesDeleteDialogComponent],
  entryComponents: [CorrectCodesDeleteDialogComponent]
})
export class CoursesCorrectCodesModule {}
