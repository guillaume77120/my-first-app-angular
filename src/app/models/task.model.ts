export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'done';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  completedAt?: string;
}

// Optionnel : On peut aussi définir un type pour la création
// (sans l'ID et la date qui seront générés par le système)
export type CreateTaskDto = Omit<Task, 'id' | 'createdAt'>;
