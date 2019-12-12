import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITeachers } from 'app/shared/model/teachers.model';
import { TeachersService } from './teachers.service';
import { TeachersDeleteDialogComponent } from './teachers-delete-dialog.component';

@Component({
  selector: 'jhi-teachers',
  templateUrl: './teachers.component.html'
})
export class TeachersComponent implements OnInit, OnDestroy {
  teachers: ITeachers[];
  eventSubscriber: Subscription;

  constructor(protected teachersService: TeachersService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.teachersService.query().subscribe((res: HttpResponse<ITeachers[]>) => {
      this.teachers = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInTeachers();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITeachers) {
    return item.id;
  }

  registerChangeInTeachers() {
    this.eventSubscriber = this.eventManager.subscribe('teachersListModification', () => this.loadAll());
  }

  delete(teachers: ITeachers) {
    const modalRef = this.modalService.open(TeachersDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.teachers = teachers;
  }
}
