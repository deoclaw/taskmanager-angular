import { Component, effect, EventEmitter, input, Output } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { Task } from '../task';

@Component({
  selector: 'app-task-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent {
  initialState = input<Task>();
  //re=/^[a-zA-Z0-9 '.,]*$/g;

  @Output()
  formValuesChanged = new EventEmitter<Task>();

  @Output()
  formSubmitted = new EventEmitter<Task>();

  taskForm = this.formBuilder.group({
    title: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z0-9 ,]*$'),
      ],
    ],
    text: [
      '',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('^[a-zA-Z0-9 ,:.-]*$'),
      ],
    ],
    priority: ['low', [Validators.required]],
  });

  constructor(private formBuilder: FormBuilder) {
    effect(() => {
      this.taskForm.setValue({
        title: this.initialState()?.title || '',
        text: this.initialState()?.text || '',
        priority: this.initialState()?.priority || 'low',
      });
    });
  }

  get title() {
    return this.taskForm.get('title')!;
  }
  get text() {
    return this.taskForm.get('text')!;
  }
  get priority() {
    return this.taskForm.get('priority')!;
  }

  submitForm() {
    this.formSubmitted.emit(this.taskForm.value as Task);
  }
}
