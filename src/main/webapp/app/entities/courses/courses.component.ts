import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICourses } from 'app/shared/model/courses.model';
import { CoursesService } from './courses.service';
import { CoursesDeleteDialogComponent } from './courses-delete-dialog.component';

@Component({
  selector: 'jhi-courses',
  templateUrl: './courses.component.html'
})
export class CoursesComponent implements OnInit, OnDestroy {
  courses: ICourses[];
  eventSubscriber: Subscription;

  constructor(protected coursesService: CoursesService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.coursesService.query().subscribe((res: HttpResponse<ICourses[]>) => {
      this.courses = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInCourses();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICourses) {
    return item.id;
  }

  registerChangeInCourses() {
    this.eventSubscriber = this.eventManager.subscribe('coursesListModification', () => this.loadAll());
  }

  delete(courses: ICourses) {
    const modalRef = this.modalService.open(CoursesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.courses = courses;
  }
}
