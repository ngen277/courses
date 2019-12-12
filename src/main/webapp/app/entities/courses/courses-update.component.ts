import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { ICourses, Courses } from 'app/shared/model/courses.model';
import { CoursesService } from './courses.service';
import { ITeachers } from 'app/shared/model/teachers.model';
import { TeachersService } from 'app/entities/teachers/teachers.service';

@Component({
  selector: 'jhi-courses-update',
  templateUrl: './courses-update.component.html'
})
export class CoursesUpdateComponent implements OnInit {
  isSaving: boolean;

  teachers: ITeachers[];

  editForm = this.fb.group({
    id: [],
    name: [],
    annotation: [],
    fullDescription: [],
    pictureLink: [],
    period: [],
    teachers: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected coursesService: CoursesService,
    protected teachersService: TeachersService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ courses }) => {
      this.updateForm(courses);
    });
    this.teachersService
      .query()
      .subscribe((res: HttpResponse<ITeachers[]>) => (this.teachers = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(courses: ICourses) {
    this.editForm.patchValue({
      id: courses.id,
      name: courses.name,
      annotation: courses.annotation,
      fullDescription: courses.fullDescription,
      pictureLink: courses.pictureLink,
      period: courses.period,
      teachers: courses.teachers
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const courses = this.createFromForm();
    if (courses.id !== undefined) {
      this.subscribeToSaveResponse(this.coursesService.update(courses));
    } else {
      this.subscribeToSaveResponse(this.coursesService.create(courses));
    }
  }

  private createFromForm(): ICourses {
    return {
      ...new Courses(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      annotation: this.editForm.get(['annotation']).value,
      fullDescription: this.editForm.get(['fullDescription']).value,
      pictureLink: this.editForm.get(['pictureLink']).value,
      period: this.editForm.get(['period']).value,
      teachers: this.editForm.get(['teachers']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICourses>>) {
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

  trackTeachersById(index: number, item: ITeachers) {
    return item.id;
  }
}
