import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  globalVariable: any;

  constructor() {}

  setSharedVariable(value: any) {
    this.globalVariable = value;
  }

  getSharedVariable() {
    return this.globalVariable;
  }
}