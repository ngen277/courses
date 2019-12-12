import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { INews, News } from 'app/shared/model/news.model';
import { NewsService } from './news.service';

@Component({
  selector: 'jhi-news-update',
  templateUrl: './news-update.component.html'
})
export class NewsUpdateComponent implements OnInit {
  isSaving: boolean;
  dateDp: any;

  editForm = this.fb.group({
    id: [],
    title: [],
    date: [],
    body: [],
    author: []
  });

  constructor(protected newsService: NewsService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ news }) => {
      this.updateForm(news);
    });
  }

  updateForm(news: INews) {
    this.editForm.patchValue({
      id: news.id,
      title: news.title,
      date: news.date,
      body: news.body,
      author: news.author
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const news = this.createFromForm();
    if (news.id !== undefined) {
      this.subscribeToSaveResponse(this.newsService.update(news));
    } else {
      this.subscribeToSaveResponse(this.newsService.create(news));
    }
  }

  private createFromForm(): INews {
    return {
      ...new News(),
      id: this.editForm.get(['id']).value,
      title: this.editForm.get(['title']).value,
      date: this.editForm.get(['date']).value,
      body: this.editForm.get(['body']).value,
      author: this.editForm.get(['author']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INews>>) {
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
