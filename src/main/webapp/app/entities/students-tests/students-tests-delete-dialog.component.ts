import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStudentsTests } from 'app/shared/model/students-tests.model';
import { StudentsTestsService } from './students-tests.service';

@Component({
  templateUrl: './students-tests-delete-dialog.component.html'
})
export class StudentsTestsDeleteDialogComponent {
  studentsTests: IStudentsTests;

  constructor(
    protected studentsTestsService: StudentsTestsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.studentsTestsService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'studentsTestsListModification',
        content: 'Deleted an studentsTests'
      });
      this.activeModal.dismiss(true);
    });
  }
}
