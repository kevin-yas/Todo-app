import {Component, EventEmitter, Input, OnInit, Output, ViewChild,AfterViewInit} from '@angular/core';
import {Task} from '../../models/Task';
import {MatDialog} from '@angular/material/dialog';
import {DetailsTaskComponent} from '../../dialog/details-task/details-task.component';
import * as moment from 'moment';
import {AlertRemoveComponent} from '../../dialog/alert-remove/alert-remove.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {SelectionModel} from '@angular/cdk/collections';





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

  dataSource = new MatTableDataSource<Task>();

  readonly moment = moment;
  displayedColumns: string[] = ['select', 'id', 'title', 'isDone', 'createdAt', 'doneAt', 'actions'];
  selection = new SelectionModel<Task>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;


    constructor(public dialog: MatDialog) {
    }

    ngOnInit(): void {
      this.dataSource.data = this.tasks;
    }
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }



  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
    console.log(this.selection.selected);
    this.selectTask.emit(this.selection.selected);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(task?: Task): string {
    if (!task) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(task) ? 'deselect' : 'select'} row ${task.id + 1}`;
  }

  toggleRow(task: Task): void{
    this.selection.toggle(task);
    console.log(this.selection.selected);
    this.selectTask.emit(this.selection.selected);
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
