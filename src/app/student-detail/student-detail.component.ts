import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { Student } from '../student';
import { Course } from '../course';

@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule
  ],
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.css'
})
export class StudentDetailComponent implements OnChanges {
  @Input() selectedStudent!: Student;
  @Output() studentSaved = new EventEmitter<Student>();

  stagedStudent!: Student;

  courseEnum = Course;

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['selectedStudent'];
    this.stageStudent(change.currentValue);
  }

  updateCourses(course: Course, isAdd: boolean) {
    if (isAdd)
      this.stagedStudent.courses.push(course);
    else
      this.stagedStudent.courses.splice(this.stagedStudent.courses.indexOf(course), 1);
  }

  hasCourse(course: Course): boolean {
    return this.stagedStudent.courses.includes(course);
  }

  saveStudent(): void {
    this.studentSaved.emit(this.stagedStudent);
  }

  cancelSave(): void {
    this.stageStudent(this.selectedStudent);
  }

  private stageStudent(student: Student): void {
    this.stagedStudent = {
      id: student.id,
      firstName: student.firstName,
      lastName: student.lastName,
      isActive: student.isActive,
      courses: [...student.courses]
    }
  }
}
