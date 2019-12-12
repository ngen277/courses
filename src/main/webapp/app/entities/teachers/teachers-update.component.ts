import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ITeachers, Teachers } from 'app/shared/model/teachers.model';
import { TeachersService } from './teachers.service';

@Component({
  selector: 'jhi-teachers-update',
  templateUrl: './teachers-update.component.html'
})
export class TeachersUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: [],
    degree: [],
    email: [],
    photo: [],
    about: []
  });

  constructor(protected teachersService: TeachersService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ teachers }) => {
      this.updateForm(teachers);
    });
  }

  updateForm(teachers: ITeachers) {
    this.editForm.patchValue({
      id: teachers.id,
      name: teachers.name,
      degree: teachers.degree,
      email: teachers.email,
      photo: teachers.photo,
      about: teachers.about
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const teachers = this.createFromForm();
    if (teachers.id !== undefined) {
      this.subscribeToSaveResponse(this.teachersService.update(teachers));
    } else {
      this.subscribeToSaveResponse(this.teachersService.create(teachers));
    }
  }

  private createFromForm(): ITeachers {
    return {
      ...new Teachers(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      degree: this.editForm.get(['degree']).value,
      email: this.editForm.get(['email']).value,
      photo: this.editForm.get(['photo']).value,
      about: this.editForm.get(['about']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITeachers>>) {
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
