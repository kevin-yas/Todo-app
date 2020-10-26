import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Task} from '../../models/Task';

@Component({
  selector: 'app-alert-remove',
  templateUrl: './alert-remove.component.html',
  styleUrls: ['./alert-remove.component.css']
})
export class AlertRemoveComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AlertRemoveComponent>,
    @Inject(MAT_DIALOG_DATA) public task: Task
) { }

  ngOnInit(): void {
  }

}
