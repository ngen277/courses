import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStudents } from 'app/shared/model/students.model';
import { StudentsService } from './students.service';

@Component({
  templateUrl: './students-delete-dialog.component.html'
})
export class StudentsDeleteDialogComponent {
  students: IStudents;

  constructor(protected studentsService: StudentsService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.studentsService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'studentsListModification',
        content: 'Deleted an students'
      });
      this.activeModal.dismiss(true);
    });
  }
}
