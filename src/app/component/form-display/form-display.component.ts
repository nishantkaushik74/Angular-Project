
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SignUPService } from 'src/app/Services/sign-up.service';
@Component({
  selector: 'app-form-display',
  templateUrl: './form-display.component.html',
  styleUrls: ['./form-display.component.scss']
})
export class FormDisplayComponent {
  variant: any;
  pdfContent: string = '';
  subjectData: string = '';
  @Input() data: any;
  @Input() items: any;

  @Output() hideChildEvent = new EventEmitter<void>();
  constructor(
    private route: ActivatedRoute,
    private _apiService: SignUPService,
    private router: Router
  ) { }
  async ngOnInit() {
    console.log("🚀 ~ file: form-display.component.ts:40 ~ FormDisplayComponent ~ onsubmit ~ this.item:", this.items)

    try {
      const subject = await this._apiService.getFinalData(this.items);
      this.variant = subject


    } catch (error) {
      console.log(error);

    }
  }
  closeBox() {
    this.hideChildEvent.emit();
  }
  onsubmit(DataSubmit: any) {
    const inputData = this._apiService.updateData(DataSubmit.value, this.items)
    this.closeBox()
    this.ngOnInit()
  }
}
