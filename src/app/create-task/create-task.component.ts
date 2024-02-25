import { Component, OnInit } from '@angular/core';
import { Task } from '../task-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskServiceService } from '../task-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  taskForm: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskServiceService, public route:Router) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      completed: [false]
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const newTask: Task = {
        id: new Date().getTime(),
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        dueDate: this.taskForm.value.dueDate,
        completed: this.taskForm.value.completed
      };
      this.taskService.createTask(newTask);
      this.taskForm.reset();
    }
  }
  navigateBack(){
    this.route.navigateByUrl('tasks')
  }
}
