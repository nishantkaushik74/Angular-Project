import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-doc-display',
  templateUrl: './doc-display.component.html',
  styleUrls: ['./doc-display.component.scss']
})
export class DocDisplayComponent {
  @Output() closeDisplayDoc = new EventEmitter<void>();
@Input() Docdata:any
  closeBox(){
    this.closeDisplayDoc.emit();

  }
}
