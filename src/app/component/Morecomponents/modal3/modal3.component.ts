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
  fileUploaded = false;
  textAreaDisabled = false;

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

    
  formData: FormData = new FormData();

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.fileUploaded = true;

    if (this.fileUploaded === true) {
      this.variant2Value = ''; 
    }
    this.textAreaDisabled = true;
    this.formData.append('pdfFile', file);
  }

  onsubmit(form: NgForm) {
    console.log("🚀 ~ file: modal3.component.ts:54 ~ Modal3Component ~ onsubmit ~ form:", form)
    // const file = this.formData.get('pdfFile');
    // form.value["PDF_file"] =file
    // this.receiveData.emit(form.value)
  }













  
}
