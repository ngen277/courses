import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IStudents, Students } from 'app/shared/model/students.model';
import { StudentsService } from './students.service';
import { ICorrectCodes } from 'app/shared/model/correct-codes.model';
import { CorrectCodesService } from 'app/entities/correct-codes/correct-codes.service';

@Component({
  selector: 'jhi-students-update',
  templateUrl: './students-update.component.html'
})
export class StudentsUpdateComponent implements OnInit {
  isSaving: boolean;

  studentcodes: ICorrectCodes[];
  registrationDateDp: any;

  editForm = this.fb.group({
    id: [],
    login: [],
    password: [],
    surname: [],
    name: [],
    middlename: [],
    ngroup: [],
    registrationDate: [],
    sex: [],
    email: [],
    isAdmin: [],
    studentCode: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected studentsService: StudentsService,
    protected correctCodesService: CorrectCodesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ students }) => {
      this.updateForm(students);
    });
    this.correctCodesService.query({ filter: 'students-is-null' }).subscribe(
      (res: HttpResponse<ICorrectCodes[]>) => {
        if (!this.editForm.get('studentCode').value || !this.editForm.get('studentCode').value.id) {
          this.studentcodes = res.body;
        } else {
          this.correctCodesService
            .find(this.editForm.get('studentCode').value.id)
            .subscribe(
              (subRes: HttpResponse<ICorrectCodes>) => (this.studentcodes = [subRes.body].concat(res.body)),
              (subRes: HttpErrorResponse) => this.onError(subRes.message)
            );
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  updateForm(students: IStudents) {
    this.editForm.patchValue({
      id: students.id,
      login: students.login,
      password: students.password,
      surname: students.surname,
      name: students.name,
      middlename: students.middlename,
      ngroup: students.ngroup,
      registrationDate: students.registrationDate,
      sex: students.sex,
      email: students.email,
      isAdmin: students.isAdmin,
      studentCode: students.studentCode
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const students = this.createFromForm();
    if (students.id !== undefined) {
      this.subscribeToSaveResponse(this.studentsService.update(students));
    } else {
      this.subscribeToSaveResponse(this.studentsService.create(students));
    }
  }

  private createFromForm(): IStudents {
    return {
      ...new Students(),
      id: this.editForm.get(['id']).value,
      login: this.editForm.get(['login']).value,
      password: this.editForm.get(['password']).value,
      surname: this.editForm.get(['surname']).value,
      name: this.editForm.get(['name']).value,
      middlename: this.editForm.get(['middlename']).value,
      ngroup: this.editForm.get(['ngroup']).value,
      registrationDate: this.editForm.get(['registrationDate']).value,
      sex: this.editForm.get(['sex']).value,
      email: this.editForm.get(['email']).value,
      isAdmin: this.editForm.get(['isAdmin']).value,
      studentCode: this.editForm.get(['studentCode']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStudents>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackCorrectCodesById(index: number, item: ICorrectCodes) {
    return item.id;
  }
}
