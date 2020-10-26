import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Task} from '../../models/Task';



@Component({
  selector: 'app-alert-remove-all',
  templateUrl: './alert-remove-all.component.html',
  styleUrls: ['./alert-remove-all.component.css']
})
export class AlertRemoveAllComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<AlertRemoveAllComponent>,
    @Inject(MAT_DIALOG_DATA) public task: Task) { }

  ngOnInit(): void {
  }

}
