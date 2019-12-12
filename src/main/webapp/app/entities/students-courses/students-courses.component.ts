import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IStudentsCourses } from 'app/shared/model/students-courses.model';
import { StudentsCoursesService } from './students-courses.service';
import { StudentsCoursesDeleteDialogComponent } from './students-courses-delete-dialog.component';

@Component({
  selector: 'jhi-students-courses',
  templateUrl: './students-courses.component.html'
})
export class StudentsCoursesComponent implements OnInit, OnDestroy {
  studentsCourses: IStudentsCourses[];
  eventSubscriber: Subscription;

  constructor(
    protected studentsCoursesService: StudentsCoursesService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll() {
    this.studentsCoursesService.query().subscribe((res: HttpResponse<IStudentsCourses[]>) => {
      this.studentsCourses = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInStudentsCourses();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IStudentsCourses) {
    return item.id;
  }

  registerChangeInStudentsCourses() {
    this.eventSubscriber = this.eventManager.subscribe('studentsCoursesListModification', () => this.loadAll());
  }

  delete(studentsCourses: IStudentsCourses) {
    const modalRef = this.modalService.open(StudentsCoursesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.studentsCourses = studentsCourses;
  }
}
