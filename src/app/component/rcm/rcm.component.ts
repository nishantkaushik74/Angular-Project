import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { SignUPService } from 'src/app/Services/sign-up.service';


@Component({
  selector: 'app-rcm',
  templateUrl: './rcm.component.html',
  styleUrls: ['./rcm.component.scss']
})
export class RcmComponent {
  //openAndClose 
  data = {
    Title: "Add RCM",
    h1: "Name the RCM you want to add ?"
  }
  isModalOpen = false;
  openModal() { this.isModalOpen = true }
  closeModal() { this.isModalOpen = false }
  //Other variables declared
  ModuleInfoTable: any;
  ModulesTable: any;
  RCMData: any;
  endPoint: any

  //Constructor
  constructor(
    private _apiService: SignUPService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }
  //NGonIt Called function
  async getData() {
    try {
      this.ModuleInfoTable = await this._apiService.getTableData("ModuleInfo")
      this.ModulesTable = await this._apiService.getTableDataOnEndPoint("Modules", this.endPoint)
      this.RCMData = this.ModuleInfoTable.filter((acts: any) => (acts.parentid == null && acts.moduleid === 9)).map((act: any, index: number) => {
        act['sno'] = index + 1;
        return act;
      })
    } catch (error) {
      console.log("🚀 ~  error:", error)
    }
  }
  //ngOnIt
  ngOnInit() {
    this.getData()
    this.endPoint = this.route.snapshot.url.join('/').split("/")[0];
  }
  //Route function Function
  roteToSubjectSelect(act: any) {
    this.router.navigate(['section/', { id: act.id, name: act.Name, parentID: act.parentid, moduleid: act.moduleid }]);
  }
  //receive data from child
  async receiveData(subject: any) {
    const inputValue = this.ModulesTable[0].id
    try {
      const a = await this._apiService.updateActTable("ModuleInfo", subject, inputValue)
    } catch (error) {
      console.log(error)
    }
    this.getData()
    this.closeModal()
  }
}
