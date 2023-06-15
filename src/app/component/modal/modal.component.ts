import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  variant: string = "";
  variant2: string= "";
  @Input() receivedData: any;
  @Input() data: any;

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
    console.log("🚀 ~ file: modal.component.ts:23 ~ ModalComponent ~ ngOnIt ~ receivedData:", this.receivedData)

    this.receiveData.emit(form.value)
  }

}
