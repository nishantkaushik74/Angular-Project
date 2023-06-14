import { Component, Input, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { log } from 'console';

@Component({
  selector: 'app-card2',
  templateUrl: './card2.component.html',
  styleUrls: ['./card2.component.scss']
})
export class Card2Component {
  //openAndClose 

  //Other variables declared
  @Input() CardData: any;
  @Output() receiveCardData = new EventEmitter<void>();

  //Constructor

  //NGonIt Called function

  //ngOnIt
  ngOnInit() {

  }
  //receive data from child
  ngOnChanges() {
    if (this.CardData) {
      // Data is available, do something with it
    }
  }
  sendItem(data: any) {
    this.receiveCardData.emit(data);
  }

}
