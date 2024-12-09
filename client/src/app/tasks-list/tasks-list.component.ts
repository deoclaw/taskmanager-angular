import { Component, OnInit, WritableSignal } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-tasks-list',
  imports: [RouterModule, MatTableModule, MatButtonModule, MatCardModule],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
})
export class TasksListComponent implements OnInit {
  tasks$ = {} as WritableSignal<Task[]>;
  displayedColumns: string[] = [
    'col-title',
    'col-text',
    'col-priority',
    'col-action',
  ]; //names of columns in our html -- tell angular to display

  constructor(private tasksService: TaskService) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  deleteTask(id: string): void {
    this.tasksService
      .deleteTask(id)
      .subscribe({ next: () => this.fetchTasks() });
  }

  private fetchTasks(): void {
    this.tasks$ = this.tasksService.tasks$;
    this.tasksService.getTasks();
    //this telss us to get all our tasks
  }
}
