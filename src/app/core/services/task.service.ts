import { Injectable, inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, combineLatest, map, tap} from 'rxjs';
import { Task } from '../../models/task.model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root' // Le service est disponible partout (Singleton).
})
export class TaskService {
  private http = inject(HttpClient);
  private readonly API = `${environment.apiUrl}/tasks`;

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

  loadTasks() {
    return this.http.get<Task[]>(this.API).pipe(
      tap(tasks => this.tasksSubject.next(tasks))
    );
  }

  addTask(newTask: Task) {
    return this.http.post<Task>(this.API, newTask).pipe(
      tap(() => this.loadTasks().subscribe())
    );
  }

  // ✅ DELETE — supprime une tâche
  deleteTask(id: string) {
    return this.http.delete(`${this.API}/${id}`).pipe(
      tap(() => this.loadTasks().subscribe())
    );
  }

  // ✅ PUT — met à jour le statut
  updateStatus(id: string, status: Task['status']) {
    const task = this.tasksSubject.value.find(t => t.id === id);
    if (!task) return;

    const updated: Task = {
      ...task,
      status,
      completedAt: status === 'done' ? new Date().toISOString() : undefined
    };

    return this.http.put<Task>(`${this.API}/${id}`, updated).pipe(
      tap(() => this.loadTasks().subscribe())
    );
  }
}
