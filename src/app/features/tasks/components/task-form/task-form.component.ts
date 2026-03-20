import { Component, inject} from "@angular/core";
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Task } from "../../../../models/task.model";
import { TaskService } from "../../../../core/services/task.service";
import { CommonModule } from "@angular/common";


@Component ({
    selector: 'app-task-form',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './task-form.component.html',
    styleUrl: './task-form.component.css'
})



export class TaskFormComponent {
    private fb = inject(FormBuilder);
    private taskService = inject(TaskService);

    taskForm: FormGroup = this.fb.group({
        title: ['', [Validators.required, Validators.minLength(3)]],
        description: [''],
        priority: ['medium', Validators.required]
    });

    onSubmit() {
    if (this.taskForm.valid) {
      // On récupère les valeurs du formulaire
      const formValues = this.taskForm.value;

      // On crée l'objet Task complet (avec ID et Date)
      const newTask: Task = {
        id: crypto.randomUUID(), // Génère un ID unique côté client
        title: formValues.title,
        description: formValues.description,
        priority: formValues.priority,
        status: 'todo', // Par défaut
        createdAt: new Date().toISOString()
      };

      // On l'envoie au service
      this.taskService.addTask(newTask)?.subscribe();

      // On vide le formulaire pour la suite
      this.taskForm.reset({ priority: 'medium' });
    }
  }
}
