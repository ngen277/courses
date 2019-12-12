import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ICorrectCodes, CorrectCodes } from 'app/shared/model/correct-codes.model';
import { CorrectCodesService } from './correct-codes.service';

@Component({
  selector: 'jhi-correct-codes-update',
  templateUrl: './correct-codes-update.component.html'
})
export class CorrectCodesUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: []
  });

  constructor(protected correctCodesService: CorrectCodesService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ correctCodes }) => {
      this.updateForm(correctCodes);
    });
  }

  updateForm(correctCodes: ICorrectCodes) {
    this.editForm.patchValue({
      id: correctCodes.id
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const correctCodes = this.createFromForm();
    if (correctCodes.id !== undefined) {
      this.subscribeToSaveResponse(this.correctCodesService.update(correctCodes));
    } else {
      this.subscribeToSaveResponse(this.correctCodesService.create(correctCodes));
    }
  }

  private createFromForm(): ICorrectCodes {
    return {
      ...new CorrectCodes(),
      id: this.editForm.get(['id']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICorrectCodes>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
