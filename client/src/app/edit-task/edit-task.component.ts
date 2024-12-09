import { Component, OnInit, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskService } from '../task.service';
import { Task } from '../task';

@Component({
  selector: 'app-edit-task',
  imports: [TaskFormComponent, MatCardModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css',
})
export class EditTaskComponent implements OnInit {
  task = {} as WritableSignal<Task>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    //getting ID from parameters -- so the url -- need to update server route!
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No ID provided');
    }

    this.taskService.getTask(id!); //sdfs
    this.task = this.taskService.task$;
  }

  editTask(task: Task) {
    this.taskService.updateTask(this.task()._id || '', task).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        alert('Failed to update task');
        console.error(error);
      },
    });
  }
}
