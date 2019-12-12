import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IAnswers, Answers } from 'app/shared/model/answers.model';
import { AnswersService } from './answers.service';
import { IQuestions } from 'app/shared/model/questions.model';
import { QuestionsService } from 'app/entities/questions/questions.service';

@Component({
  selector: 'jhi-answers-update',
  templateUrl: './answers-update.component.html'
})
export class AnswersUpdateComponent implements OnInit {
  isSaving: boolean;

  questions: IQuestions[];

  editForm = this.fb.group({
    id: [],
    answerContent: [],
    rightAnswer: [],
    questions: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected answersService: AnswersService,
    protected questionsService: QuestionsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ answers }) => {
      this.updateForm(answers);
    });
    this.questionsService
      .query()
      .subscribe((res: HttpResponse<IQuestions[]>) => (this.questions = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(answers: IAnswers) {
    this.editForm.patchValue({
      id: answers.id,
      answerContent: answers.answerContent,
      rightAnswer: answers.rightAnswer,
      questions: answers.questions
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const answers = this.createFromForm();
    if (answers.id !== undefined) {
      this.subscribeToSaveResponse(this.answersService.update(answers));
    } else {
      this.subscribeToSaveResponse(this.answersService.create(answers));
    }
  }

  private createFromForm(): IAnswers {
    return {
      ...new Answers(),
      id: this.editForm.get(['id']).value,
      answerContent: this.editForm.get(['answerContent']).value,
      rightAnswer: this.editForm.get(['rightAnswer']).value,
      questions: this.editForm.get(['questions']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAnswers>>) {
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

  trackQuestionsById(index: number, item: IQuestions) {
    return item.id;
  }
}
