import { Component, OnInit } from '@angular/core';
import { Task } from '../task-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskServiceService } from '../task-service.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  taskForm: FormGroup;
  task: Task | undefined;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private taskService: TaskServiceService,public router:Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const taskId = Number(params['id']);
      this.task = this.taskService.getTaskById(taskId);
      console.log(this.task);
    });
    const taskId = Number(this.route.snapshot.paramMap.get('id'));
    this.taskForm = this.fb.group({
      title: [this.task && this.task.title ? this.task.title : '', Validators.required],
      description: [this.task && this.task.description ? this.task.description : '', Validators.required],
      dueDate: [this.task && this.task.dueDate ? this.task.dueDate : '', Validators.required],
      completed: [this.task && this.task.completed != null ? this.task.completed : false]
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid && this.task) {
      const updatedTask: Task = {
        id:this.task.id,
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        dueDate: this.taskForm.value.dueDate,
        completed: this.taskForm.value.completed
      };
      this.taskService.updateTask(updatedTask);
    }
    this.router.navigateByUrl('tasks')
  }
}
