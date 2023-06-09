import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { SignUPService } from 'src/app/Services/sign-up.service';
@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent {

  //openAndClose 
  data = {
    h1: "Add Act",
    h2: "Name the Act you want to add?"
  }
  isModalOpen = false;
  openModal() { this.isModalOpen = true }
  closeModal() { this.isModalOpen = false }
  //Other variables declared
  ModuleInfoTable: any;
  ModulesTable: any;
  RulesData: any;
  //Constructor
  constructor(
    private _apiService: SignUPService, private router: Router
  ) { }
  //NGonIt Called function
  async getData() {
    try {
      this.ModuleInfoTable = await this._apiService.getTableData("ModuleInfo")
      this.ModulesTable = await this._apiService.getTableData("Modules")
      this.RulesData = this.ModuleInfoTable.filter((acts: any) => (acts.parentid == null && acts.moduleid==2))
    } catch (error) {
      console.log("🚀 ~  error:", error)
    }
  }
  //ngOnIt
  ngOnInit() { this.getData() }
  //Route function Function
  roteToSubjectSelect(act: any) {
    this.router.navigate(['gst/act/section/', { id: act.id, name: act.Name, parentID: act.parentid, moduleid: act.moduleid }]);
  }
  //receive data from child
  receiveData(subject: any) {
    const inputValue = this.ModulesTable[1]
    try {
      const a = this._apiService.updateActTable("ModuleInfo", subject, inputValue)
    } catch (error) {
      console.log(error)

    }
    this.getData()
    this.closeModal()
  }
}
