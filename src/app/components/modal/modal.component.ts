import { Component, OnInit, Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

@Injectable({
  providedIn: 'root'
})



export class ModalComponent implements OnInit {

  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }

  openDialog(data): void {
    console.log(data.firstName);
    this.dialog.open(ModalComponent, {
      data: {
        name: data.firstName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth,
        position: data.position
      }
    });
  }

  ngOnInit(): void {
  }

}
