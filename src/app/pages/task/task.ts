import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { TaskHeader } from "../../components/task-header/task-header";
import { TaskForm } from "../../components/task-form/task-form";
import { TaskItem } from "../../components/task-item/task-item";
import { TaskService } from './task.service';
import { ConfirmService } from '../../shared/confirm.service';
import { ToastService } from '../../shared/toast.service';
import { Task } from '../../../types';

@Component({
  selector: 'app-task',
  imports: [TaskHeader, TaskForm, TaskItem],
  templateUrl: './task.html',
  styleUrl: './task.css',
})
export class TaskComponent implements OnInit {
  
  private readonly taskService = inject(TaskService);
  private readonly confirmService = inject(ConfirmService);
  private readonly toastService = inject(ToastService);

  tasks = signal<Task[]>([]);
  completedTasksCount = computed(() => this.tasks().filter(task => task?.completed).length);
  totalTasksCount = computed(() => this.tasks().length);

  selectedTask = signal<Task | undefined>(undefined);
  isEditMode = signal(false);

  constructor() {
    console.log('TaskComponent initialized');
    effect(() => {
      console.log('Tasks updated:', this.tasks());
    });
  }
  
  async ngOnInit(): Promise<void> {
    console.log('Fetched tasks:', this.tasks);
    // Attendre que l’utilisateur soit connecté avant de récupérer les tâches
    const checkAuth = () => {
      return new Promise<void>((resolve) => {
        const interval = setInterval(() => {
          // @ts-ignore
          const user = this.taskService["auth"].currentUser;
          if (user && user.uid) {
            clearInterval(interval);
            resolve();
          }
        }, 100);
      });
    };
    await checkAuth();
    // Abonnement en temps réel aux tâches
    try {
      this.taskService.subscribeToTasks((tasks) => {
        this.tasks.set(tasks);
        console.log('Realtime tasks update:', tasks);
      });
    } catch (error) {
      console.error('Error subscribing to tasks:', error);
    }
  }

  onEditTask(task: Task) {
    this.selectedTask.set(task);
    this.isEditMode.set(true);
    // Scroll to form for visibility (small UX improvement)
    requestAnimationFrame(() => {
      const el = document.querySelector('.task-form');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  async onDeleteTask(task: Task) {
    if (!task?.id) return;

    const confirm = await this.confirmService.confirm(`Supprimer la tâche « ${task.title || 'sans titre'} » ?`);
    if (!confirm) return;

    try {
      await this.taskService.deleteTask(task.id!);
      this.toastService.show('Tâche supprimée', 'success');
      console.log('Task deleted:', task.id);
    } catch (err) {
      console.error('Failed to delete task:', err);
      this.toastService.show('Erreur lors de la suppression', 'error');
    }
  }

  // Handle event emitted by TaskForm after create/update
  onTaskSaved(task: Task | null) {
    // clear edit UI state
    this.selectedTask.set(undefined);
    this.isEditMode.set(false);
    if (task) {
      // show success toast
      this.toastService.show('Tâche enregistrée', 'success');
      console.log('Task saved (create/update):', task.id);
    } else {
      this.toastService.show('Échec lors de la sauvegarde', 'error');
    }
  }
}

