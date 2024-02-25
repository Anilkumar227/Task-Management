import { TestBed } from '@angular/core/testing';
import { TaskServiceService } from './task-service.service';
import { Task } from './task-model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('TaskServiceService', () => {
  let service: TaskServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskServiceService],
      imports: [Injectable,BehaviorSubject,HttpClientTestingModule,FormsModule]
    });
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a task', () => {
    const task: Task = {
      id: 1, title: 'Task 1', description: 'Description 1',
      dueDate: undefined,
      completed: false
    };
    service.createTask(task);
    const tasks = service.getTasks();
    expect(tasks.length).toBe(1);
    expect(tasks[0]).toEqual(task);
  });

  it('should get tasks', () => {
    const tasks = service.getTasks();
    expect(tasks).toEqual([]);
  });

  it('should get task by id', () => {
    const task: Task = {
      id: 1, title: 'Task 1', description: 'Description 1',
      dueDate: undefined,
      completed: false
    };
    service.createTask(task);
    const retrievedTask = service.getTaskById(1);
    expect(retrievedTask).toEqual(task);
  });

  it('should update task', () => {
    const task: Task = {
      id: 1, title: 'Task 1', description: 'Description 1',
      dueDate: undefined,
      completed: false
    };
    service.createTask(task);
    const updatedTask: Task = {
      id: 1, title: 'Updated Task', description: 'Updated Description',
      dueDate: undefined,
      completed: false
    };
    service.updateTask(updatedTask);
    const retrievedTask = service.getTaskById(1);
    expect(retrievedTask).toEqual(updatedTask);
  });

  it('should delete task', () => {
    const task: Task = {
      id: 1, title: 'Task 1', description: 'Description 1',
      dueDate: undefined,
      completed: false
    };
    service.createTask(task);
    service.deleteTask(1);
    const tasks = service.getTasks();
    expect(tasks.length).toBe(0);
  });

  it('should initialize with tasks from localStorage', () => {
    const tasks: Task[] = [
      { 
        id: 1, 
        title: 'Task 1', 
        description: 'Description 1', 
        dueDate: new Date(), 
        completed: false
      },
      { 
        id: 2, 
        title: 'Task 2', 
        description: 'Description 2', 
        dueDate: new Date(), 
        completed: true
      }
    ];
    localStorage.setItem('tasks', JSON.stringify(tasks));
    service = new TaskServiceService();
    const retrievedTasks = service.getTasks();
    expect(retrievedTasks).toEqual(tasks);
  });
  
});
