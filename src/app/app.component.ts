import { Component, signal, inject, OnInit} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser';
import { TaskFormComponent } from './features/tasks/components/task-form/task-form.component';
import { TaskListComponent } from './features/tasks/components/task-list/task-list.component';
import { TaskService} from './core/services/task.service';

@Component({
  selector: 'app-root',
  imports: [TaskFormComponent, TaskListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class App implements OnInit {

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
  private taskService = inject(TaskService);
  ngOnInit() {
    this.taskService.loadTasks().subscribe();
  }
}
