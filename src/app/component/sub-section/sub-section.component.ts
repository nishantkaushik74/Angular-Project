import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignUPService } from 'src/app/Services/sign-up.service';

@Component({
  selector: 'app-sub-section',
  templateUrl: './sub-section.component.html',
  styleUrls: ['./sub-section.component.scss']
})
export class SubSectionComponent {
  //openAndClose
  isDocDisplayOpen = false;
  isModalOpen = false;
  openModal() { this.isModalOpen = true }
  closeModal() { this.isModalOpen = false }
  openDisplayDoc(data: any) {
    console.log("🚀 ~ file: section.component.ts:17 ~ SectionComponent ~ openDisplayDoc ~ data:", data)
    this.isDocDisplayOpen = true
    this.Docdata = data
  }
  closeDisplayDoc() {
    this.isDocDisplayOpen = false
  }
  //Other variables declared
  URLdata: any;
  ModuleInfoTable: any;
  dataToSend = 1;
  data = {
    h1: "Add Sub Section",
    h2: "Name the Sub Section you want to add?",
    h3: "Sub Section details"
  }
  Docdata: any

  //Constructor
  constructor(private route: ActivatedRoute, private _apiService: SignUPService, private router: Router) { }
  //ngOnIt
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const moduleid = params.get('moduleid');
      const id = params.get('id');
      const name = params.get('name');
      const parentId = params.get('parentID');
      this.URLdata = { id, name, parentId, moduleid };
      this.getData()
    })
  }

  //ngOnIt Called function
  async getData() {
    try {
      this.ModuleInfoTable = await this._apiService.getTableDataOnParentID("ModuleInfo", this.URLdata)
      this.ModuleInfoTable.map((act: any, index: number) => {
        act['sno'] = index + 1;
        return act;
      })
    } catch (error) {
      console.log("🚀 ~  error:", error)
    }
  }
  //other Function
  //receive data from child
  receiveData(subject: any) {
    try {
      const a = this._apiService.updateModuleInfo("ModuleInfo", subject, this.URLdata)
    } catch (error) {
      console.log(error)
    }
    this.ngOnInit()
    this.getData()
    this.closeModal()
  }
}
