import { Component, inject, Input } from '@angular/core';
import { TaskService } from '../../pages/task/task.service';

@Component({
  selector: 'task-header',
  imports: [],
  templateUrl: './task-header.html',
  styleUrl: './task-header.css',
  standalone: true
})
export class TaskHeader {

  @Input() completedTasksCount: number = 0;
  @Input() totalTasksCount: number = 0;

}

