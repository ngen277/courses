import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStudentsCourses } from 'app/shared/model/students-courses.model';

@Component({
  selector: 'jhi-students-courses-detail',
  templateUrl: './students-courses-detail.component.html'
})
export class StudentsCoursesDetailComponent implements OnInit {
  studentsCourses: IStudentsCourses;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ studentsCourses }) => {
      this.studentsCourses = studentsCourses;
    });
  }

  previousState() {
    window.history.back();
  }
}
