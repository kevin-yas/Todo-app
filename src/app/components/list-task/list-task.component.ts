import {Component, EventEmitter, Input, OnInit, Output, ViewChild,AfterViewInit} from '@angular/core';
import {Task} from '../../models/Task';
import {MatDialog} from '@angular/material/dialog';
import {DetailsTaskComponent} from '../../dialog/details-task/details-task.component';
import * as moment from 'moment';
import {AlertRemoveComponent} from '../../dialog/alert-remove/alert-remove.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';




@ Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit,AfterViewInit {
    

  @Input() tasks: Task[] = [];
  @Output() doneEvent: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() editEvent: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() deleteEvent: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() selectTask: EventEmitter<Task[]> = new EventEmitter<Task[]>();

  dataSource = new MatTableDataSource<any>();

  readonly moment = moment;
  displayedColumns: string[] = ['Select', 'id', 'title', 'isDone', 'createdAt', 'doneAt', 'actions'];
  selectedTask: Task[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;


    constructor(public dialog: MatDialog) {
    }

    ngOnInit(): void {
      this.dataSource.data = this.tasks;
    }

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }

    onChange(checked: boolean, task: Task){
     if (checked) this.selectedTask.push(task);
     else (this.selectedTask.splice(this.selectedTask.indexOf(task)));
      console.log(this.selectedTask);
      this.selectTask.emit(this.selectedTask);
    }


  done(task: Task) {
    if (task.isDone) { return; }
    this.doneEvent.emit(task);
  }

  remove(task: Task) {
    const sub = this.dialog.open(AlertRemoveComponent, {data: task})
      .afterClosed().subscribe(confirm => {
        if (confirm) {
          this.deleteEvent.emit(task);
        }
      }).add(() => sub.unsubscribe());
  }

  edit(task: Task) {
    this.editEvent.emit(task);
  }

  showMore(task: Task) {
    this.dialog.open(DetailsTaskComponent, {
      data: task
    });
  }
}
