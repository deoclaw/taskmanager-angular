import { Routes } from '@angular/router';
import { TasksListComponent } from './tasks-list/tasks-list.component';

//we need to route our app
export const routes: Routes = [
  { path: ``, component: TasksListComponent, title: 'Tasks List' },
];
