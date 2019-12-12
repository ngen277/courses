import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IQuestions, Questions } from 'app/shared/model/questions.model';
import { QuestionsService } from './questions.service';
import { ICourseParts } from 'app/shared/model/course-parts.model';
import { CoursePartsService } from 'app/entities/course-parts/course-parts.service';

@Component({
  selector: 'jhi-questions-update',
  templateUrl: './questions-update.component.html'
})
export class QuestionsUpdateComponent implements OnInit {
  isSaving: boolean;

  courseparts: ICourseParts[];

  editForm = this.fb.group({
    id: [],
    content: [],
    courseParts: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected questionsService: QuestionsService,
    protected coursePartsService: CoursePartsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ questions }) => {
      this.updateForm(questions);
    });
    this.coursePartsService
      .query()
      .subscribe(
        (res: HttpResponse<ICourseParts[]>) => (this.courseparts = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(questions: IQuestions) {
    this.editForm.patchValue({
      id: questions.id,
      content: questions.content,
      courseParts: questions.courseParts
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const questions = this.createFromForm();
    if (questions.id !== undefined) {
      this.subscribeToSaveResponse(this.questionsService.update(questions));
    } else {
      this.subscribeToSaveResponse(this.questionsService.create(questions));
    }
  }

  private createFromForm(): IQuestions {
    return {
      ...new Questions(),
      id: this.editForm.get(['id']).value,
      content: this.editForm.get(['content']).value,
      courseParts: this.editForm.get(['courseParts']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IQuestions>>) {
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

  trackCoursePartsById(index: number, item: ICourseParts) {
    return item.id;
  }
}
