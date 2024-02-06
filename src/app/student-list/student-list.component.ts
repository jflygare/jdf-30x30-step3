import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Student } from '../student';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent {
  @Input() students: Student[] = [];
  @Output() studentSelected = new EventEmitter<Student>();
  // TODO: Move to detail view
  @Output() studentDeleted = new EventEmitter<Student>();
  @Output() newStudent = new EventEmitter<void>();

  selectStudent(student: Student): void {
    this.studentSelected.emit(student);
  }

  addStudent() {
    this.newStudent.emit();
  }

  deleteStudent(student: Student) {
    this.studentDeleted.emit(student);
  }

}
