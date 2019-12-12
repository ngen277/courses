import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IStudentsTests } from 'app/shared/model/students-tests.model';
import { StudentsTestsService } from './students-tests.service';
import { StudentsTestsDeleteDialogComponent } from './students-tests-delete-dialog.component';

@Component({
  selector: 'jhi-students-tests',
  templateUrl: './students-tests.component.html'
})
export class StudentsTestsComponent implements OnInit, OnDestroy {
  studentsTests: IStudentsTests[];
  eventSubscriber: Subscription;

  constructor(
    protected studentsTestsService: StudentsTestsService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll() {
    this.studentsTestsService.query().subscribe((res: HttpResponse<IStudentsTests[]>) => {
      this.studentsTests = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInStudentsTests();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IStudentsTests) {
    return item.id;
  }

  registerChangeInStudentsTests() {
    this.eventSubscriber = this.eventManager.subscribe('studentsTestsListModification', () => this.loadAll());
  }

  delete(studentsTests: IStudentsTests) {
    const modalRef = this.modalService.open(StudentsTestsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.studentsTests = studentsTests;
  }
}
