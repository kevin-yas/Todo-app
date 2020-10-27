import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from '../../models/Task';
import {MatDialog} from '@angular/material/dialog';
import {AlertRemoveAllComponent} from '../../dialog/alert-remove-all/alert-remove-all.component';



@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  formTask = {...Task.EMPTY_MODEL};
  @Output() addEvent: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() editEvent: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() deleteEvent: EventEmitter<Task[]> = new EventEmitter<Task[]>();
  @Output() doneEvent: EventEmitter<Task[]> =  new EventEmitter<Task[]>();
  

  @Input() toEdit: Task;
  @Input() selectedTask: Task[];
  isDone: boolean = true;
   

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  addHandler() {
    if (this.toEdit) {
      this.editEvent.emit(this.toEdit);
      this.toEdit = null;
      return;
    }
    this.addEvent.emit(this.formTask);
    this.formTask = {...Task.EMPTY_MODEL};
  }

  removeAll():void{
    const sub = this.dialog.open(AlertRemoveAllComponent, {data: this.selectedTask})
      .afterClosed().subscribe(confirm => {
        if (confirm) {
          this.deleteEvent.emit(this.selectedTask);
        }
      }).add(() => sub.unsubscribe());// unsubscribe
  }

  doneAll(): void{

    this.selectedTask.forEach(task => {
      if (task.isDone)
    { 
      return; 
      this.isDone = true;}
    else
    {this.doneEvent.emit(this.selectedTask);
      this.isDone = false;
    }
    });
   }
  }
