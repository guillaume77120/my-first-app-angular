import { Component, signal} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser';
import { TaskFormComponent } from './features/tasks/components/task-form/task-form.component';
import { TaskListComponent } from './features/tasks/components/task-list/task-list.component';

@Component({
  selector: 'app-root',
  imports: [TaskFormComponent, TaskListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class App {

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.iconRegistry.addSvgIcon(
      'trash',
      this.sanitizer.bypassSecurityTrustResourceUrl('trash.svg')
    );
  }
  protected readonly title = signal('my-first-app-angular');
}
