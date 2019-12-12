import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICourses } from 'app/shared/model/courses.model';

@Component({
  selector: 'jhi-courses-detail',
  templateUrl: './courses-detail.component.html'
})
export class CoursesDetailComponent implements OnInit {
  courses: ICourses;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ courses }) => {
      this.courses = courses;
    });
  }

  previousState() {
    window.history.back();
  }
}
