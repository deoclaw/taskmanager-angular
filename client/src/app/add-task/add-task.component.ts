import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-add-task',
  imports: [TaskFormComponent, MatCardModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent {
  constructor(private router: Router, private taskService: TaskService) {}

  addTask(task: Task) {
    this.taskService.createTask(task).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        alert('Failed to create task!');
        console.error(error);
      },
    });
    this.taskService.getTasks();
  }
}
