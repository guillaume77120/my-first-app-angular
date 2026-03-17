import { Component, inject, OnInit, } from "@angular/core";
import { TaskService } from "../../../../core/services/task.service";
import { AsyncPipe} from "@angular/common";
import { Observable } from "rxjs";
import { Task } from "../../../../models/task.model";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: 'app-task-list',
    standalone: true,
    imports: [AsyncPipe, MatIconModule],
    templateUrl: './task-list.component.html',
    styleUrl: './task-list.component.css'
})

export class TaskListComponent implements OnInit {
    private taskService = inject(TaskService);
    
    tasks$!: Observable<Task[]>;
    
    ngOnInit(): void {
        this.tasks$ = this.taskService.filteredTasks$;
    }
    onDelete(id: string) {
        if (confirm('Êtes-vous sur de vouloir supprimer cette tâche ?')) {
            this.taskService.deleteTask(id);
        }
    }
    applyFilter(val: string) {
        this.taskService.setFilter(val);
    }
    
    toggleDone(task: Task) {
        const newStatus = task.status === 'done'
            ? 'todo'
            : 'done';

        this.taskService.updateStatus(task.id, newStatus);
    }
}   
