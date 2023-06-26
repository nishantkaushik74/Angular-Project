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
  currentPage = 1;
  itemsPerPage = 5; // Set your desired number of items per page

  ngOnInit() {

  }
  ngOnChanges() {
    if (this.CardData) {
    }
  }
  sendItem(data: any) {
    this.receiveCardData.emit(data);
  }

  getPaginatedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.CardData.slice(startIndex, endIndex);
  }

  goToPage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  getPaginationRange(): number[] {
    const pageCount = Math.ceil(this.CardData.length / this.itemsPerPage);
    return Array(pageCount).fill(0).map((_, i) => i + 1);
  }
}
