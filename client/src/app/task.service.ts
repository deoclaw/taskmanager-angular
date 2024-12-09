import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from './task';

@Injectable({
  providedIn: 'root',
})

//url is where our SERVER API is running
export class TaskService {
  private url = 'http://localhost:3500';
  tasks$ = signal<Task[]>([]);
  task$ = signal<Task>({} as Task);

  constructor(private httpClient: HttpClient) {}

  private refreshTasks() {
    this.httpClient.get<Task[]>(`${this.url}/tasks`).subscribe((tasks) => {
      this.tasks$.set(tasks);
    });
  }

  getTasks() {
    this.refreshTasks();
    return this.tasks$();
  }

  //need this for editing tasks
  //need to also make route for this
  getTask(id: string) {
    this.httpClient.get<Task>(`${this.url}/tasks/${id}`).subscribe((task) => {
      this.task$.set(task);
      return this.task$();
    });
  }

  //parameter clled 'task' of type Task (interface)
  createTask(task: Task) {
    return this.httpClient.post(`${this.url}/tasks`, task, {
      responseType: 'text',
    });
  }

  //right now my api doesn't pass params. maybe it should?
  updateTask(id: string, task: Task) {
    return this.httpClient.patch(`${this.url}/tasks/${id}`, task, {
      responseType: 'text',
    });
  }

  deleteTask(id: string) {
    return this.httpClient.delete(`${this.url}/tasks/${id}`, {
      responseType: 'text',
    });
  }
}
