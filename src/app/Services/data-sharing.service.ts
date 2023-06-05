import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private sharedObject: any;

  constructor() { }

  setSharedObject(obj: any) {
    this.sharedObject = obj;
  }

  getSharedObject() {
    return this.sharedObject;
  }
}
