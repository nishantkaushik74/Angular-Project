import { Component,ChangeDetectorRef  } from '@angular/core';
import { SignUPService } from 'src/app/Services/sign-up.service';

@Component({
  selector: 'app-acts1',
  templateUrl: './acts1.component.html',
  styleUrls: ['./acts1.component.scss']
})
export class Acts1Component {

  isCardOpen = false;
  parentData = {}
  data1 : any;

  constructor(
    private _apiService: SignUPService,
    private cdr: ChangeDetectorRef
  ) { }

  async ngOnInit(){
    
    try {
      const data = await this._apiService.getTableData("Act");
      this.data1 = data;
      
    } catch (error) {
    console.log("🚀 ~ file: acts1.component.ts:20 ~ Acts1Component ~ ngOnInit ~ error:", error)
    }
  }


  addActHandler() {
    this.isCardOpen = true;
    this.parentData = {
      question: "Please enter name of the act ?",
      button1: "Enter",
    }
  }
  //changes
  async handleFormData(formData: any) {
    
    try {
      const data =await this._apiService.insertData("Act",formData.actName)
    } catch (error) {
    }
    this.ngOnInit()
  }
  hideChild(): void {
    this.isCardOpen = false;
  }
}
