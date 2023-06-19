import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-modal2',
  templateUrl: './modal2.component.html',
  styleUrls: ['./modal2.component.scss']
})
export class Modal2Component {
  variant: any;
  variant2: any;
  variant3: any;
  //openAndClose 

  @Input() data: any;
  showDate = false;

  @Output() closeModal = new EventEmitter<void>();
  @Output() receiveData = new EventEmitter<void>();

  //Other variables declared

  //Constructor
  //ngOnIt
  ngOnInit() {

  }
  //ngOnIt Called function

  //other Function
  closeBox() {
    this.closeModal.emit();
  }
  onsubmit(form: NgForm) {
    this.receiveData.emit(form.value)
  }
}
