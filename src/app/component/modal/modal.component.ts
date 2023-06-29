import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  variant: string = "";
  variant2: string = "";
  variant3: string = "";
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
  selectedFile: File | undefined;

  variant2Value = '';
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
    form.value["PDF_file"] = file

    this.receiveData.emit(form.value)
  }
  isFileSelected(): boolean {
    return !!this.fileUploaded;
  }
}
