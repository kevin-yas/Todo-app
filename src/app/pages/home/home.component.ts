import {Component, OnInit, ViewChild} from '@angular/core';
import {Task} from '../../models/Task';
import {TodoService} from '../../services/todo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  msg: string;
	clss: string;
  allTask: Array<Task> = [];
  editMe: Task;
  selectedTaskIn: Task[] = [];
  


  constructor(private todoService: TodoService) {
  }

  ngOnInit(): void {
    // Recuperation des tasks depuis la base de donnee
    // Mettre les donnees dans allTask
    //Eto no azo ilay donnée
    this.todoService.getTasks().subscribe(
      r => {
        this.allTask = r.reverse();
        console.log(r);
      },
      error => {
        console.log('Get all tasks error: ', error);
      });
    
  }
  

  onAdd(newTask: Task): void {
    this.todoService.addTask(newTask).subscribe(
      response => {
        console.log(response);
        this.allTask.push({...newTask, id: this.allTask.length + 1, createdAt: new Date()});
        this.allTask = this.allTask.filter(x => true);
        newTask = {...Task.EMPTY_MODEL};
      },
      error => {
        console.log('Erreur: ' + error);
      }
    );
  }

  onDone(taskToBeDone: Task): void {
    console.log(taskToBeDone);
    this.todoService.doneTask(taskToBeDone.id).subscribe(
      response => {
        taskToBeDone.isDone = true;
        taskToBeDone.doneAt = new Date();
        console.log(taskToBeDone);
      }
    );
  }


  onEdit(taskToEdit: Task): void {
        this.editMe = {...taskToEdit};
  }

  onDelete(id: number): void {
    console.log("kjf",id);
    this.todoService.removeTask(id).subscribe(
      response => {
        this.allTask = this.allTask.filter(task => task.id !== id);
      }
    );
  }
  

  handleEdit(editedTask: Task): void {
    const taskFound = this.allTask.find(task => task.id === editedTask.id);
    taskFound.title = editedTask.title;
    taskFound.description = editedTask.description;
    this.todoService.editTask(editedTask).subscribe();
  }

  onEvent(event){
    this.selectedTaskIn = event;
    console.log("Evenet :", event);
  }

  onDeleteAll(id:number): void{
   //parcourire tableau pour trouver : id this.selectedTaskIn.forEach(task => console.log(task.id));
    this.selectedTaskIn.forEach(task => this.todoService.removeTask(task.id).subscribe(
      response => {
        this.allTask = this.allTask.filter(task => task.id !== id);
      }
    ));
  
  }

  onDoneAll(selectedTaskIn: Task): void{
    console.log("done:",this.selectedTaskIn);
    this.selectedTaskIn.forEach(task => this.todoService.doneTask(task.id).subscribe(
      response => {
        task.isDone = true;
        task.doneAt = new Date();
      }
    ));
  }
  

}
