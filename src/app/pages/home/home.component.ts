import {Component, OnInit} from '@angular/core';
import {Task} from "../../models/Task";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allTask: Array<Task> = [];
  editMe: Task;

  constructor() {
  }

  ngOnInit(): void {
    for (let i = 1; i < 5; i++) {
      this.allTask.push({
          id: i,
          description: '',
          createdAt: new Date(),
          doneAt: i % 2 === 0 ? new Date() : null,
          title: 'Angular ' + i * 2,
          isDone: i % 2 === 0
        },
      );
    }
    // Recuperation des tasks depuis la base de donnee
    // Mettre les donnees dans allTask
  }

  onAdd(newTask: Task) {
    this.allTask.push({...newTask, id: this.allTask.length + 1, createdAt: new Date()});
    this.allTask = this.allTask.filter(x => true);
  }

  onDone(taskToBeDone: Task) {
    const task = this.allTask.find(task => task.id === taskToBeDone.id);
    task.isDone = true;
    task.doneAt = new Date();
  }

  onDelete(id: number) {
    this.allTask = this.allTask.filter(task => task.id !== id);
  }

  onEdit(taskToEdit: Task) {
    this.editMe = {...taskToEdit};
  }

  handleEdit(editedTask: Task) {
    const task = this.allTask.find(task => task.id === editedTask.id);
    task.description = editedTask.description;
    task.title = editedTask.title;
  }

}
