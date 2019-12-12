import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICourseParts } from 'app/shared/model/course-parts.model';
import { CoursePartsService } from './course-parts.service';
import { CoursePartsDeleteDialogComponent } from './course-parts-delete-dialog.component';

@Component({
  selector: 'jhi-course-parts',
  templateUrl: './course-parts.component.html'
})
export class CoursePartsComponent implements OnInit, OnDestroy {
  courseParts: ICourseParts[];
  eventSubscriber: Subscription;

  constructor(
    protected coursePartsService: CoursePartsService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll() {
    this.coursePartsService.query().subscribe((res: HttpResponse<ICourseParts[]>) => {
      this.courseParts = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInCourseParts();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICourseParts) {
    return item.id;
  }

  registerChangeInCourseParts() {
    this.eventSubscriber = this.eventManager.subscribe('coursePartsListModification', () => this.loadAll());
  }

  delete(courseParts: ICourseParts) {
    const modalRef = this.modalService.open(CoursePartsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.courseParts = courseParts;
  }
}
