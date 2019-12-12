import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICourseParts } from 'app/shared/model/course-parts.model';

@Component({
  selector: 'jhi-course-parts-detail',
  templateUrl: './course-parts-detail.component.html'
})
export class CoursePartsDetailComponent implements OnInit {
  courseParts: ICourseParts;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ courseParts }) => {
      this.courseParts = courseParts;
    });
  }

  previousState() {
    window.history.back();
  }
}
