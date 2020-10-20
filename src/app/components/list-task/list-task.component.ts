import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from '../../models/Task';
import {MatDialog} from '@angular/material/dialog';
import {DetailsTaskComponent} from '../../dialog/details-task/details-task.component';
import * as moment from 'moment';
import {AlertRemoveComponent} from '../../dialog/alert-remove/alert-remove.component';

@ Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {
  @Input() tasks: Task[] = [];
  @Output() doneEvent: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() editEvent: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() deleteEvent: EventEmitter<Task> = new EventEmitter<Task>();
  readonly moment = moment;
  displayedColumns: string[] = ['id', 'title', 'isDone', 'createdAt', 'doneAt', 'actions'];

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
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
