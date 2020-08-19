import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // API URL vytáhnout do configu
  private webApiPositionUrl = 'https://ibillboard.com/api/positions';
  jobPositions: any = [];
  positionsArray: any = [];

  constructor(private http: HttpClient) {
  }

  getJobPositions(): string[] {
    this.http.get(this.webApiPositionUrl).subscribe(result => {
      this.jobPositions = result;
      for (let i = 0; this.jobPositions.positions.length > i; i++) {
        this.positionsArray.push(this.jobPositions.positions[i]);
      }
    });
    return this.positionsArray;
  }
}

