import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'students',
        loadChildren: () => import('./students/students.module').then(m => m.CoursesStudentsModule)
      },
      {
        path: 'courses',
        loadChildren: () => import('./courses/courses.module').then(m => m.CoursesCoursesModule)
      },
      {
        path: 'course-parts',
        loadChildren: () => import('./course-parts/course-parts.module').then(m => m.CoursesCoursePartsModule)
      },
      {
        path: 'questions',
        loadChildren: () => import('./questions/questions.module').then(m => m.CoursesQuestionsModule)
      },
      {
        path: 'answers',
        loadChildren: () => import('./answers/answers.module').then(m => m.CoursesAnswersModule)
      },
      {
        path: 'students-courses',
        loadChildren: () => import('./students-courses/students-courses.module').then(m => m.CoursesStudentsCoursesModule)
      },
      {
        path: 'students-tests',
        loadChildren: () => import('./students-tests/students-tests.module').then(m => m.CoursesStudentsTestsModule)
      },
      {
        path: 'teachers',
        loadChildren: () => import('./teachers/teachers.module').then(m => m.CoursesTeachersModule)
      },
      {
        path: 'correct-codes',
        loadChildren: () => import('./correct-codes/correct-codes.module').then(m => m.CoursesCorrectCodesModule)
      },
      {
        path: 'news',
        loadChildren: () => import('./news/news.module').then(m => m.CoursesNewsModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class CoursesEntityModule {}
