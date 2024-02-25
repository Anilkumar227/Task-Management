import { Component, Inject, OnInit } from '@angular/core';
import { Task } from '../task-model';
import { ActivatedRoute } from '@angular/router';
import { TaskServiceService } from '../task-service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {

  task: Task | undefined;

  constructor(private route: ActivatedRoute, private taskService: TaskServiceService,public dialogRef: MatDialogRef<TaskDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data);
      this.task = this.taskService.getTaskById(data.id);
     }

  ngOnInit(): void {
    // const taskId = Number(this.route.snapshot.paramMap.get('id'));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
