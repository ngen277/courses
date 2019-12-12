import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStudentsCourses } from 'app/shared/model/students-courses.model';
import { StudentsCoursesService } from './students-courses.service';

@Component({
  templateUrl: './students-courses-delete-dialog.component.html'
})
export class StudentsCoursesDeleteDialogComponent {
  studentsCourses: IStudentsCourses;

  constructor(
    protected studentsCoursesService: StudentsCoursesService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.studentsCoursesService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'studentsCoursesListModification',
        content: 'Deleted an studentsCourses'
      });
      this.activeModal.dismiss(true);
    });
  }
}
