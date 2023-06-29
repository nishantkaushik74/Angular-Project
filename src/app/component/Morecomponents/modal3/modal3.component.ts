import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal3',
  templateUrl: './modal3.component.html',
  styleUrls: ['./modal3.component.scss']
})
export class Modal3Component {

  variant: any;
  variant2: any;
  variant3: any;
  variant2Value = '';

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

    
  
  formData: FormData = new FormData();
  fileUploaded = false;
  textAreaDisabled = false;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.fileUploaded = true;

    if (this.fileUploaded === true) {
      this.variant2Value = ''; 
    }
    this.textAreaDisabled = true;
    this.formData.append('docx', file);
  }

  onsubmit(form: NgForm) {
    const file = this.formData.get('docx');
    form.value["PDF_file"] =file
    console.log("🚀 ~ file: modal3.component.ts:56 ~ Modal3Component ~ onsubmit ~ form.value:", form.value)
    this.receiveData.emit(form.value)
  }
  
}
