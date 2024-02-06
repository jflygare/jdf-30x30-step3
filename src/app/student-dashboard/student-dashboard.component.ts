import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { StudentListComponent } from "../student-list/student-list.component";
import { StudentDetailComponent } from "../student-detail/student-detail.component";
import { Course } from '../course';
import { Student } from '../student';

@Component({
    selector: 'app-student-dashboard',
    templateUrl: './student-dashboard.component.html',
    styleUrl: './student-dashboard.component.css',
    standalone: true,
    imports: [
        MatGridListModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        StudentListComponent,
        StudentDetailComponent
    ]
})
export class StudentDashboardComponent implements OnInit {
  students: Student[] = [];

  selectedStudent: Student = this.getStudentById(-1);

  ngOnInit(): void {
    this.students = [
      {
        id: 0,
        firstName: "Joe",
        lastName: "Smith",
        isActive: true,
        courses: [
          Course.MachineLearning
        ]
      },
      {
        id: 1,
        firstName: "Jane",
        lastName: "Doe",
        isActive: false,
        courses: [
          Course.IntroToHtml,
          Course.FunctionalJavaScript
        ]
      }
    ];
  }

  selectStudent(student: Student): void {
    this.selectedStudent = student;
  }

  newStudent(): void {
    this.selectedStudent = this.getStudentById(-1);
  }

  deleteStudent(student: Student): void {
    this.students.splice(this.students.findIndex((s) => student.id === s.id), 1);
    if (this.selectedStudent.id === student.id)
      this.newStudent()
  }

  saveStudent(student: Student): void {
    const isNew = student.id === -1;
    if (isNew)
      student.id = this.getNextId();
    else
      // remove and re-add, as instances may not be equal
      //this.deleteStudent(student); // prevent unnecessary events
      this.students.splice(this.students.findIndex((s) => student.id === s.id), 1);

    this.students.push(student);
    this.selectedStudent = student;
  }

  private getNextId(): number {
    if (this.students.length === 0) {
      return 0;
    }
    return this.students.map(s => s.id).reduce((prev, current) => (prev > current) ? prev : current) + 1;
  }

  private getStudentById(id: number): Student {
    if (id == -1) {
      return {
        id: id,
        firstName: null!,
        lastName: null!,
        isActive: false,
        courses: []
      }
    }
    return this.students.find((s) => s.id === id)!
  }
}
