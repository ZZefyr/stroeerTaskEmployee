import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

@Injectable({
  providedIn: 'root'
})
export class ModalComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    this.dialog.open(ModalComponent);
  }

  ngOnInit(): void {
  }

}
