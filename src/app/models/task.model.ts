export interface Task {
  // On utilise 'string' pour l'ID car les bases de données (UUID/Mongo) 
  // renvoient souvent des chaînes, pas des nombres.
  id: string;
  
  title: string;
  description: string;
  
  // Utiliser un type d'union (Union Types) est crucial.
  // Cela empêche de mettre n'importe quoi d'autre que ces 3 valeurs.
  status: 'todo' | 'doing' | 'done';
  
  priority: 'low' | 'medium' | 'high';

  // Toujours dater ses objets pour le tri et l'affichage.
  createdAt: Date;
  
  // Optionnel (le ?) : permet de savoir si la tâche a été finie.
  completedAt?: Date;
}

// Optionnel : On peut aussi définir un type pour la création 
// (sans l'ID et la date qui seront générés par le système)
export type CreateTaskDto = Omit<Task, 'id' | 'createdAt'>;