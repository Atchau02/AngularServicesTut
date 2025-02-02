import { Injectable, signal } from "@angular/core";
import { Task } from "./task.model";

@Injectable({ providedIn: "root" })
export class TaskService {
  private tasks = signal<Task[]>([]);

  allTasks = this.tasks.asReadonly();

  addTask(taskData: { title: string; description: string }) {
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(),
      status: "OPEN",
    };
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  updateTaskStatus(taskId: string, newStatus: Task["status"]) {
    this.tasks.update((tasks) =>
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  }
}
