import { bootstrapApplication } from '@angular/platform-browser';
import { TodoListComponent } from './app/todo-list/todo-list.component';

bootstrapApplication(TodoListComponent)
  .catch((err) => console.error(err));

