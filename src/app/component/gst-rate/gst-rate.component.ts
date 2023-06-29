import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { SignUPService } from 'src/app/Services/sign-up.service';

@Component({
  selector: 'app-gst-rate',
  templateUrl: './gst-rate.component.html',
  styleUrls: ['./gst-rate.component.scss']
})
export class GstRateComponent {
  //openAndClose 
  data = {
    Title : "Add GST",
    h1 : "Name the GST rate you want to add ?"
  }
  isModalOpen = false;
  openModal() { this.isModalOpen = true }
  closeModal() { this.isModalOpen = false }
  //Other variables declared
  ModuleInfoTable: any;
  ModulesTable: any;
  GstRateData: any;
  //Constructor
  constructor(
    private _apiService: SignUPService, private router: Router
  ) { }
  //NGonIt Called function
  async getData() {
    try {
      this.ModuleInfoTable = await this._apiService.getTableData("ModuleInfo")
      this.ModulesTable = await this._apiService.getTableData("Modules")
      this.GstRateData = this.ModuleInfoTable.filter((acts: any) => (acts.parentid == null && acts.moduleid == 5)).map((act: any, index: number) => {
        act['sno'] = index + 1;
        return act;
      })
    } catch (error) {
      console.log("🚀 ~  error:", error)
    }
  }
  //ngOnIt
  ngOnInit() { this.getData() }
  //Route function Function
  roteToSubjectSelect(act: any) {
    this.router.navigate(['section/', { id: act.id, name: act.Name, parentID: act.parentid, moduleid: act.moduleid }]);
  }
  //receive data from child
  receiveData(subject: any) {
    const inputValue = this.ModulesTable[4]
    try {
      const a = this._apiService.updateActTable("ModuleInfo", subject, inputValue)
    } catch (error) {
      console.log(error)

    }
    this.getData()
    this.closeModal()
  }
}
