import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // API URL vytáhnout do configu
  private webApiPositionUrl = 'http://ibillboard.com/api/positions';
  jobPositions: object[] = [];
  positionsArray: string[] = [];

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

