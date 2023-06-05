import { Component, ChangeDetectorRef } from '@angular/core';
import { log } from 'console';
import { SignUPService } from 'src/app/Services/sign-up.service';

@Component({
  selector: 'app-acts1',
  templateUrl: './acts1.component.html',
  styleUrls: ['./acts1.component.scss']
})
export class Acts1Component {
  isCardOpen = false;
  data1: any;
  updateActData: any;
  constructor(
    private _apiService: SignUPService,
    private cdr: ChangeDetectorRef
  ) { }
  async ngOnInit() {
    try {
      const data = await this._apiService.getTableData("Act");
      this.data1 = data;

    } catch (error) {
      console.log("🚀 ~ file: acts1.component.ts:20 ~ Acts1Component ~ ngOnInit ~ error:", error)
    }
  }
  addActHandler() {
    this.isCardOpen = true;

  }
  async handleFormData(formData: any) {
    try { const data = await this._apiService.insertData("Act", formData) } catch (error) { }
    this.hideChild()
    this.ngOnInit()
  }
  hideChild(): void {
    this.isCardOpen = false;
  }
  async deleteAct(item: any) {
    try {
      const data = await this._apiService.deleteRow("Act", item);
      console.log(data);
    } catch (error) { }
    this.ngOnInit()
  }
  updateAct(item: any) {
    this.isCardOpen = true;
    this.updateActData=item
  }
}
