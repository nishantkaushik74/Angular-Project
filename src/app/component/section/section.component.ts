import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignUPService } from 'src/app/Services/sign-up.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent {
  //openAndClose 
  isModalOpen = false;
  isDocDisplayOpen = false;
  openModal() { this.isModalOpen = true }
  closeModal() { this.isModalOpen = false }
  openDisplayDoc(data: any) {
    this.isDocDisplayOpen = true
    this.Docdata = data
  }
  closeDisplayDoc() {
    this.isDocDisplayOpen = false
  }
  dataToSend = 1;
  data = {
    h1: "Add Section",
    h2: "Name the Section you want to add?",
    h3: "Section details"
  }
  //Other variables declared
  URLdata: any;
  ModuleInfoTable: any;
  Docdata: any
  //Constructor
  constructor(private route: ActivatedRoute, private _apiService: SignUPService, private router: Router) { }

  //ngOnIt
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      const moduleid = params.get('moduleid');
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

  //Route function Function
  roteToSubSection(subject: any) {
    console.log("🚀 ~ file: section.component.ts:44 ~ SectionComponent ~ roteToSubSection ~ subject:", subject)
    this.router.navigate(['gst/act/section/subsection', {
      id: subject.id,
      name: subject.Name,
      parentID: subject.parentid,
      moduleid: subject.moduleid
    }]);
  }
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
