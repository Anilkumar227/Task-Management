import { Component, OnInit } from '@angular/core';
import { TaskServiceService } from '../task-service.service';
import { Task } from '../task-model';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { TaskDetailsComponent } from '../task-details/task-details.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];

  constructor(private taskService: TaskServiceService, private route:Router,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.taskService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
    });
  }
 navigateToTask(taskId: number){
  const id = taskId
  this.route.navigate(['tasks/edit'], { queryParams: { id } });
 }

 navigateToCreateTask(){
  this.route.navigateByUrl('tasks/new')
 }

openDialog(taskId: number): void {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.width = '720px';
  dialogConfig.height = '720px';
  dialogConfig.disableClose = true;
  dialogConfig.data = { id: taskId };
  dialogConfig.position = {
    top: '50%',
    left: '50%',
  };

  this.dialog.open(TaskDetailsComponent, dialogConfig);
}

  markAsCompleted(task: Task): void {
    task.completed = true;
    this.taskService.updateTask(task);
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId);
  }

}
