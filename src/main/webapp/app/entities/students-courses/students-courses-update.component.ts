import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IStudentsCourses, StudentsCourses } from 'app/shared/model/students-courses.model';
import { StudentsCoursesService } from './students-courses.service';
import { IStudents } from 'app/shared/model/students.model';
import { StudentsService } from 'app/entities/students/students.service';
import { ICourses } from 'app/shared/model/courses.model';
import { CoursesService } from 'app/entities/courses/courses.service';

@Component({
  selector: 'jhi-students-courses-update',
  templateUrl: './students-courses-update.component.html'
})
export class StudentsCoursesUpdateComponent implements OnInit {
  isSaving: boolean;

  students: IStudents[];

  courses: ICourses[];
  registrationDateDp: any;
  endDateDp: any;

  editForm = this.fb.group({
    id: [],
    status: [],
    registrationDate: [],
    endDate: [],
    students: [],
    courses: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected studentsCoursesService: StudentsCoursesService,
    protected studentsService: StudentsService,
    protected coursesService: CoursesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ studentsCourses }) => {
      this.updateForm(studentsCourses);
    });
    this.studentsService
      .query()
      .subscribe((res: HttpResponse<IStudents[]>) => (this.students = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.coursesService
      .query()
      .subscribe((res: HttpResponse<ICourses[]>) => (this.courses = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(studentsCourses: IStudentsCourses) {
    this.editForm.patchValue({
      id: studentsCourses.id,
      status: studentsCourses.status,
      registrationDate: studentsCourses.registrationDate,
      endDate: studentsCourses.endDate,
      students: studentsCourses.students,
      courses: studentsCourses.courses
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const studentsCourses = this.createFromForm();
    if (studentsCourses.id !== undefined) {
      this.subscribeToSaveResponse(this.studentsCoursesService.update(studentsCourses));
    } else {
      this.subscribeToSaveResponse(this.studentsCoursesService.create(studentsCourses));
    }
  }

  private createFromForm(): IStudentsCourses {
    return {
      ...new StudentsCourses(),
      id: this.editForm.get(['id']).value,
      status: this.editForm.get(['status']).value,
      registrationDate: this.editForm.get(['registrationDate']).value,
      endDate: this.editForm.get(['endDate']).value,
      students: this.editForm.get(['students']).value,
      courses: this.editForm.get(['courses']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStudentsCourses>>) {
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

  trackStudentsById(index: number, item: IStudents) {
    return item.id;
  }

  trackCoursesById(index: number, item: ICourses) {
    return item.id;
  }
}
