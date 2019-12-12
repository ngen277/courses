import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IStudentsTests, StudentsTests } from 'app/shared/model/students-tests.model';
import { StudentsTestsService } from './students-tests.service';
import { IStudentsCourses } from 'app/shared/model/students-courses.model';
import { StudentsCoursesService } from 'app/entities/students-courses/students-courses.service';
import { ICourseParts } from 'app/shared/model/course-parts.model';
import { CoursePartsService } from 'app/entities/course-parts/course-parts.service';

@Component({
  selector: 'jhi-students-tests-update',
  templateUrl: './students-tests-update.component.html'
})
export class StudentsTestsUpdateComponent implements OnInit {
  isSaving: boolean;

  studentscourses: IStudentsCourses[];

  courseparts: ICourseParts[];
  lastTestDateDp: any;

  editForm = this.fb.group({
    id: [],
    attemps: [],
    percent: [],
    lastTestDate: [],
    studentsCourses: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected studentsTestsService: StudentsTestsService,
    protected studentsCoursesService: StudentsCoursesService,
    protected coursePartsService: CoursePartsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ studentsTests }) => {
      this.updateForm(studentsTests);
    });
    this.studentsCoursesService
      .query()
      .subscribe(
        (res: HttpResponse<IStudentsCourses[]>) => (this.studentscourses = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.coursePartsService
      .query()
      .subscribe(
        (res: HttpResponse<ICourseParts[]>) => (this.courseparts = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(studentsTests: IStudentsTests) {
    this.editForm.patchValue({
      id: studentsTests.id,
      attemps: studentsTests.attemps,
      percent: studentsTests.percent,
      lastTestDate: studentsTests.lastTestDate,
      studentsCourses: studentsTests.studentsCourses
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const studentsTests = this.createFromForm();
    if (studentsTests.id !== undefined) {
      this.subscribeToSaveResponse(this.studentsTestsService.update(studentsTests));
    } else {
      this.subscribeToSaveResponse(this.studentsTestsService.create(studentsTests));
    }
  }

  private createFromForm(): IStudentsTests {
    return {
      ...new StudentsTests(),
      id: this.editForm.get(['id']).value,
      attemps: this.editForm.get(['attemps']).value,
      percent: this.editForm.get(['percent']).value,
      lastTestDate: this.editForm.get(['lastTestDate']).value,
      studentsCourses: this.editForm.get(['studentsCourses']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStudentsTests>>) {
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

  trackStudentsCoursesById(index: number, item: IStudentsCourses) {
    return item.id;
  }

  trackCoursePartsById(index: number, item: ICourseParts) {
    return item.id;
  }

  getSelected(selectedVals: any[], option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
