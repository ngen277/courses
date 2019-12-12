import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAnswers } from 'app/shared/model/answers.model';
import { AnswersService } from './answers.service';
import { AnswersDeleteDialogComponent } from './answers-delete-dialog.component';

@Component({
  selector: 'jhi-answers',
  templateUrl: './answers.component.html'
})
export class AnswersComponent implements OnInit, OnDestroy {
  answers: IAnswers[];
  eventSubscriber: Subscription;

  constructor(protected answersService: AnswersService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.answersService.query().subscribe((res: HttpResponse<IAnswers[]>) => {
      this.answers = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInAnswers();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IAnswers) {
    return item.id;
  }

  registerChangeInAnswers() {
    this.eventSubscriber = this.eventManager.subscribe('answersListModification', () => this.loadAll());
  }

  delete(answers: IAnswers) {
    const modalRef = this.modalService.open(AnswersDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.answers = answers;
  }
}
