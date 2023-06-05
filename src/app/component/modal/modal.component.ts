import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  subsection: boolean = false;
  @Input() FormData: any;
  @Output() hideChildEvent = new EventEmitter<void>();
  @Output() formDataEvent = new EventEmitter<any>();
  actName = "";

  onsubmit(form: NgForm) {
    this.formDataEvent.emit(form.value);
}
  closeBox() {    
    this.hideChildEvent.emit();
  }
}