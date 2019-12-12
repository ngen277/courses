import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICorrectCodes } from 'app/shared/model/correct-codes.model';
import { CorrectCodesService } from './correct-codes.service';

@Component({
  templateUrl: './correct-codes-delete-dialog.component.html'
})
export class CorrectCodesDeleteDialogComponent {
  correctCodes: ICorrectCodes;

  constructor(
    protected correctCodesService: CorrectCodesService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.correctCodesService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'correctCodesListModification',
        content: 'Deleted an correctCodes'
      });
      this.activeModal.dismiss(true);
    });
  }
}
