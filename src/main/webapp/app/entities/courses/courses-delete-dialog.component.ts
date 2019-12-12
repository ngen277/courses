import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICourses } from 'app/shared/model/courses.model';
import { CoursesService } from './courses.service';

@Component({
  templateUrl: './courses-delete-dialog.component.html'
})
export class CoursesDeleteDialogComponent {
  courses: ICourses;

  constructor(protected coursesService: CoursesService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.coursesService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'coursesListModification',
        content: 'Deleted an courses'
      });
      this.activeModal.dismiss(true);
    });
  }
}
