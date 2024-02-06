import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentDashboardComponent } from "./student-dashboard/student-dashboard.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, StudentDashboardComponent]
})
export class AppComponent {
  title = 'jdf-30x30-step3';
}
