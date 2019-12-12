import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICorrectCodes } from 'app/shared/model/correct-codes.model';
import { CorrectCodesService } from './correct-codes.service';
import { CorrectCodesDeleteDialogComponent } from './correct-codes-delete-dialog.component';

@Component({
  selector: 'jhi-correct-codes',
  templateUrl: './correct-codes.component.html'
})
export class CorrectCodesComponent implements OnInit, OnDestroy {
  correctCodes: ICorrectCodes[];
  eventSubscriber: Subscription;

  constructor(
    protected correctCodesService: CorrectCodesService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll() {
    this.correctCodesService.query().subscribe((res: HttpResponse<ICorrectCodes[]>) => {
      this.correctCodes = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInCorrectCodes();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICorrectCodes) {
    return item.id;
  }

  registerChangeInCorrectCodes() {
    this.eventSubscriber = this.eventManager.subscribe('correctCodesListModification', () => this.loadAll());
  }

  delete(correctCodes: ICorrectCodes) {
    const modalRef = this.modalService.open(CorrectCodesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.correctCodes = correctCodes;
  }
}
