import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { log } from 'console';
import { SignUPService } from 'src/app/Services/sign-up.service';


@Component({
  selector: 'app-acts1',
  templateUrl: './acts1.component.html',
  styleUrls: ['./acts1.component.scss']
})
export class Acts1Component {
  //openAndClose 
  isModalOpen = false;
  openModal() { this.isModalOpen = true }
  closeModal() { this.isModalOpen = false }
  //Other variables declared
  endPoint:any
  ModuleInfoTable: any;
  ModulesTable: any;
  ActData: any;
  data = {
    Title: "Add Act",
    h1: "Name the Act you want to add ?"
  }

  //Constructor
  constructor(
    private _apiService: SignUPService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }
  //NGonIt Called function
  async getData() {
    try {
      this.ModulesTable = await this._apiService.getTableDataOnEndPoint("Modules", this.endPoint)
      this.ModuleInfoTable = await this._apiService.getModuleInfoTableData("ModuleInfo", this.ModulesTable[0]?.id, null)
      this.ActData = this.ModuleInfoTable.map((act: any, index: number) => {
        act['sno'] = index + 1;
        return act;
      })
    } catch (error) {
      console.log("🚀 ~  error:", error)
    }
  }
  //ngOnIt
  ngOnInit() { 
    this.endPoint = this.route.snapshot.url.join('/').split("/")[0];
    this.getData() 
  }
  //Route function Function
  roteToSubjectSelect(act: any) {
    this.router.navigate(['section/', { id: act.id, name: act.Name, parentID: act.parentid, moduleid: act.moduleid }]);
  }
  //receive data from child
  receiveData(subject: any) {
    const inputValue = this.ModulesTable[0].id
    try {
      const a = this._apiService.updateActTable("ModuleInfo", subject, inputValue)
    } catch (error) {
      console.log(error)
    }
    this.getData()
    this.closeModal()
  }
}
