import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  tasks: { title: string; completed: boolean }[] = [];
  newTask: string = '';
  filter: 'all' | 'pending' | 'completed' = 'all';

  ngOnInit() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  addTask() {
    if (this.newTask.trim()) {
      this.tasks.push({ title: this.newTask.trim(), completed: false });
      this.newTask = '';
      this.saveTasks();
    }
  }

  toggleTask(index: number) {
    this.tasks[index].completed = !this.tasks[index].completed;
    this.saveTasks();
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    this.saveTasks();
  }

  filterTasks(): { title: string; completed: boolean }[] {
    if (this.filter === 'pending') {
      return this.tasks.filter((task) => !task.completed); 
    } else if (this.filter === 'completed') {
      return this.tasks.filter((task) => task.completed); 
    }
    return this.tasks; 
  }

  deleteCompletedTasks() {
    this.tasks = this.tasks.filter((task) => !task.completed); 
    this.saveTasks();
  }

  get pendingTasksCount(): number {
    return this.tasks.filter((task) => !task.completed).length;
  }

  get completedTasksCount(): number {
    return this.tasks.filter((task) => task.completed).length;
  }
}





