import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICourseParts } from 'app/shared/model/course-parts.model';
import { CoursePartsService } from './course-parts.service';

@Component({
  templateUrl: './course-parts-delete-dialog.component.html'
})
export class CoursePartsDeleteDialogComponent {
  courseParts: ICourseParts;

  constructor(
    protected coursePartsService: CoursePartsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.coursePartsService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'coursePartsListModification',
        content: 'Deleted an courseParts'
      });
      this.activeModal.dismiss(true);
    });
  }
}
