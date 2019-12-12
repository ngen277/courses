import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IQuestions } from 'app/shared/model/questions.model';
import { QuestionsService } from './questions.service';
import { QuestionsDeleteDialogComponent } from './questions-delete-dialog.component';

@Component({
  selector: 'jhi-questions',
  templateUrl: './questions.component.html'
})
export class QuestionsComponent implements OnInit, OnDestroy {
  questions: IQuestions[];
  eventSubscriber: Subscription;

  constructor(protected questionsService: QuestionsService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.questionsService.query().subscribe((res: HttpResponse<IQuestions[]>) => {
      this.questions = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInQuestions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IQuestions) {
    return item.id;
  }

  registerChangeInQuestions() {
    this.eventSubscriber = this.eventManager.subscribe('questionsListModification', () => this.loadAll());
  }

  delete(questions: IQuestions) {
    const modalRef = this.modalService.open(QuestionsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.questions = questions;
  }
}
