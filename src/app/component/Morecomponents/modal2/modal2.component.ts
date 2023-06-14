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

  @Input() receivedData: any;
  @Input() data: any;
  showDate = false;

  //openAndClose 
  @Output() closeModal = new EventEmitter<void>();
  closeBox() {
    this.closeModal.emit();
  }
  //Other variables declared
  @Output() receiveData = new EventEmitter<void>();

  //Constructor
  //ngOnIt
  ngOnInit() {
    
  }
  //ngOnIt Called function

  //other Function

  onsubmit(form: NgForm) {
    this.receiveData.emit(form.value)
  }
}
