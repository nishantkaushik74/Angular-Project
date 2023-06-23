import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private imageSource = new BehaviorSubject<string>(''); // Initial image source
  public image$ = this.imageSource.asObservable();

  public setImageSource(imageUrl: string): void {
    this.imageSource.next(imageUrl);
  }
}