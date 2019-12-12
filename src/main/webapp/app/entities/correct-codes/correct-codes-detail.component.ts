import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICorrectCodes } from 'app/shared/model/correct-codes.model';

@Component({
  selector: 'jhi-correct-codes-detail',
  templateUrl: './correct-codes-detail.component.html'
})
export class CorrectCodesDetailComponent implements OnInit {
  correctCodes: ICorrectCodes;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ correctCodes }) => {
      this.correctCodes = correctCodes;
    });
  }

  previousState() {
    window.history.back();
  }
}
