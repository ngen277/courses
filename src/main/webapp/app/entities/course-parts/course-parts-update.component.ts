import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { ICourseParts, CourseParts } from 'app/shared/model/course-parts.model';
import { CoursePartsService } from './course-parts.service';
import { IStudentsTests } from 'app/shared/model/students-tests.model';
import { StudentsTestsService } from 'app/entities/students-tests/students-tests.service';
import { ICourses } from 'app/shared/model/courses.model';
import { CoursesService } from 'app/entities/courses/courses.service';

@Component({
  selector: 'jhi-course-parts-update',
  templateUrl: './course-parts-update.component.html'
})
export class CoursePartsUpdateComponent implements OnInit {
  isSaving: boolean;

  studentstests: IStudentsTests[];

  courses: ICourses[];

  editForm = this.fb.group({
    id: [],
    npart: [],
    downloadLink: [],
    downloadDescription: [],
    testName: [],
    testQuestionCount: [],
    userTests: [],
    courses: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected coursePartsService: CoursePartsService,
    protected studentsTestsService: StudentsTestsService,
    protected coursesService: CoursesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ courseParts }) => {
      this.updateForm(courseParts);
    });
    this.studentsTestsService
      .query()
      .subscribe(
        (res: HttpResponse<IStudentsTests[]>) => (this.studentstests = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.coursesService
      .query()
      .subscribe((res: HttpResponse<ICourses[]>) => (this.courses = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(courseParts: ICourseParts) {
    this.editForm.patchValue({
      id: courseParts.id,
      npart: courseParts.npart,
      downloadLink: courseParts.downloadLink,
      downloadDescription: courseParts.downloadDescription,
      testName: courseParts.testName,
      testQuestionCount: courseParts.testQuestionCount,
      userTests: courseParts.userTests,
      courses: courseParts.courses
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const courseParts = this.createFromForm();
    if (courseParts.id !== undefined) {
      this.subscribeToSaveResponse(this.coursePartsService.update(courseParts));
    } else {
      this.subscribeToSaveResponse(this.coursePartsService.create(courseParts));
    }
  }

  private createFromForm(): ICourseParts {
    return {
      ...new CourseParts(),
      id: this.editForm.get(['id']).value,
      npart: this.editForm.get(['npart']).value,
      downloadLink: this.editForm.get(['downloadLink']).value,
      downloadDescription: this.editForm.get(['downloadDescription']).value,
      testName: this.editForm.get(['testName']).value,
      testQuestionCount: this.editForm.get(['testQuestionCount']).value,
      userTests: this.editForm.get(['userTests']).value,
      courses: this.editForm.get(['courses']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICourseParts>>) {
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

  trackStudentsTestsById(index: number, item: IStudentsTests) {
    return item.id;
  }

  trackCoursesById(index: number, item: ICourses) {
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
