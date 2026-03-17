import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { Task } from '../../models/task.model';

@Injectable({
  providedIn: 'root' // Le service est disponible partout (Singleton)
})
export class TaskService {
  // 1. La source de données (Privée pour ne pas être modifiée de l'extérieur)
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  private filterSubject = new BehaviorSubject< 'all' | 'low' | 'medium' | 'high'>('all');

  setFilter(priority: any) {
    this.filterSubject.next(priority); 
  }

  filteredTasks$ = combineLatest([
    this.tasksSubject.asObservable(),
    this.filterSubject.asObservable()
  ]).pipe(
    map(([tasks, filter]) => {
      if (filter === 'all') {
        return tasks;
      }
      return tasks.filter(t => t.priority === filter);
    })
  );
  // Le '$' à la fin est une convention de nommage pour les Observables.
  tasks$ = this.tasksSubject.asObservable();

  constructor() {
    // Optionnel : Charger des données initiales ou depuis le LocalStorage ici
  }

  // 3. Méthode pour ajouter une tâche
  addTask(newTask: Task): void {
    const currentTasks = this.tasksSubject.value; // On récupère l'état actuel
    this.tasksSubject.next([...currentTasks, newTask]); // On émet un nouveau tableau (Immuabilité)
  }

  // 4. Méthode pour supprimer une tâche
  deleteTask(id: string): void {
    const updatedTasks = this.tasksSubject.value.filter(task => task.id !== id);
    this.tasksSubject.next(updatedTasks);
  }

  updateStatus(id: string, status: Task['status']) {

    const tasks = this.tasksSubject.value.map(task => {

        if (task.id !== id) return task;

        return {
        ...task,
        status,
        completedAt: status === 'done' ? new Date() : undefined
        };

    });

    this.tasksSubject.next(tasks);

    }
  updateFilter(newFilter: any) {
    this.filterSubject.next(newFilter);
  }
}