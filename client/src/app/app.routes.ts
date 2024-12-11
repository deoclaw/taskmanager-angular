import { Routes } from '@angular/router';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { AboutComponent } from './about/about.component';

//we need to route our app
export const routes: Routes = [
  { path: ``, component: TasksListComponent, title: 'Tasks List' },
  { path: 'about', component: AboutComponent, title: 'About The App' },
  { path: 'new', component: AddTaskComponent },
  { path: 'edit/:id', component: EditTaskComponent },
];
