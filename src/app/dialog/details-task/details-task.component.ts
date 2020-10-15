import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Task} from "../../models/Task";

@Component({
  selector: 'app-details-task',
  templateUrl: './details-task.component.html',
  styleUrls: ['./details-task.component.css']
})
export class DetailsTaskComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DetailsTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public task: Task
  ) { }

  ngOnInit(): void {
  }
}
