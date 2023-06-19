import { Component, Input, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { log } from 'console';

@Component({
  selector: 'app-card3',
  templateUrl: './card3.component.html',
  styleUrls: ['./card3.component.scss']
})
export class Card3Component {

  //openAndClose 

  //Other variables declared
  @Input() CardData: any;
  @Input() heading: any;

  @Output() receiveCardData = new EventEmitter<void>();

  //Constructor

  //NGonIt Called function

  //ngOnIt
  ngOnInit() {

  }
  //receive data from child
  ngOnChanges() {
    if (this.CardData) {
      // console.log("🚀 ~ file: card2.component.ts:15 ~ Card2Component ~ CardData:", this.CardData)
    }
  }
  sendItem(data: any) {
    this.receiveCardData.emit(data);
  }
}