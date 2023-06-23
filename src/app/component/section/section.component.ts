import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignUPService } from 'src/app/Services/sign-up.service';
import { Location } from '@angular/common';

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
  cardHeadings: any;

  data: any;
 
  //Other variables declared
  URLdata: any;
  ModuleInfoTable: any;
  Docdata: any
  moduleID: any;
  
  //Constructor
  constructor(
    private route: ActivatedRoute,
    private _apiService: SignUPService,
    private router: Router,
    private location: Location) { }

  //ngOnIt
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.moduleID = params.get('moduleid');
      const name = params.get('name');
      const parentId = params.get('parentID');
      this.URLdata = { id, name, parentId, moduleid: this.moduleID };
      this.getData()
    })

    if (this.moduleID == 1) this.cardHeadings = ["Subject:", "Section:"];
    else if (this.moduleID == 2) this.cardHeadings = ["Rule:", "Subject:"];
    
    this.data = {
      Title: "Add Section",
      h1: "Name the Section you want to add?",
      h2: this.cardHeadings || null,
      DataEnter: "Section details"
    };
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
    this.router.navigate(['section/subsection', {
      id: subject.id,
      name: subject.Name,
      parentID: subject.parentid,
      moduleid: subject.moduleid
    }]);
  }
  //receive data from child
  receiveData(subject: any) {
    subject['variant'] = subject.variant + "," + subject.variant3;
    try {
      const a = this._apiService.updateModuleInfo("ModuleInfo", subject, this.URLdata)
    } catch (error) {
      console.log(error)
    }
    this.ngOnInit()
    this.getData()
    this.closeModal()

  }
  goBack(): void {
    this.location.back();
  }
}
