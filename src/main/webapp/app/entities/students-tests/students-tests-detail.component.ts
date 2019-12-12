import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStudentsTests } from 'app/shared/model/students-tests.model';

@Component({
  selector: 'jhi-students-tests-detail',
  templateUrl: './students-tests-detail.component.html'
})
export class StudentsTestsDetailComponent implements OnInit {
  studentsTests: IStudentsTests;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ studentsTests }) => {
      this.studentsTests = studentsTests;
    });
  }

  previousState() {
    window.history.back();
  }
}
