import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-card4',
  templateUrl: './card4.component.html',
  styleUrls: ['./card4.component.scss']
})
export class Card4Component {
  @Input() CardData: any;
  @Input() heading: any;
  @Output() receiveCardData = new EventEmitter<void>();
  ngOnInit() {

  }
  ngOnChanges() {
    if (this.CardData) {
    }
  }
  sendItem(data: any) {
    this.receiveCardData.emit(data);
  }

}
