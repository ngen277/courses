import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITeachers } from 'app/shared/model/teachers.model';

@Component({
  selector: 'jhi-teachers-detail',
  templateUrl: './teachers-detail.component.html'
})
export class TeachersDetailComponent implements OnInit {
  teachers: ITeachers;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ teachers }) => {
      this.teachers = teachers;
    });
  }

  previousState() {
    window.history.back();
  }
}
