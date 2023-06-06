import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
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
  headings={
    heading1:"Acts Names",
    heading2:"Name of the act ?",
    
  }
  constructor(
    private _apiService: SignUPService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }
  async ngOnInit() {
    try {
      const data = await this._apiService.getTableData("Act",null,0,"a");
      this.data1 = data;
    } catch (error) {
      console.log("🚀 ~ file: acts1.component.ts:20 ~ Acts1Component ~ ngOnInit ~ error:", error)
    }
  }
  addActHandler() {
    this.isCardOpen = true;
  }
  async handleFormData(formData: any) {
    try {
      const data = await this._apiService.insertData("Act", formData,null);    
    } catch (error) { }
    this.hideChild()
    this.ngOnInit()
  }
  hideChild(): void {
    this.isCardOpen = false;
    this.updateActData = ""
  }
  async deleteAct(item: any) {
    try {
      const data = await this._apiService.deleteRow("Act", item);
    } catch (error) { }
    this.ngOnInit()
  }
  displaySubject_section(item:any){
    this.router.navigate(['gst/act', item.id,item.name_of_act]);
  }
  updateAct(item: any) {
    this.isCardOpen = true;
    this.updateActData = item
  } 
}
