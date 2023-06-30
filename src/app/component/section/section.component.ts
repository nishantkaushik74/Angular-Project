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
  openModal() { this.isModalOpen = true }
  closeModal() { this.isModalOpen = false }


  isDocDisplayOpen = false;

  openDisplayDoc(data: any) {
    this.isDocDisplayOpen = true
    this.Docdata = data
  }
  closeDisplayDoc() {
    this.isDocDisplayOpen = false
  }

  isViewerOpen = false
  openViewer(data: any) {
    if (data.URL) {
      this.isViewerOpen = true
      this.Docdata = data.URL;

    }
    else if (data.data) {
      this.isDocDisplayOpen = true;
      this.Docdata = data.data;

    }
  }
  closeViewer() {
    this.isViewerOpen = false
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
    if (this.moduleID == 2) this.cardHeadings = ["Rule:", "Subject:"];
    if (this.moduleID == 5) this.cardHeadings = [""];
    if (this.moduleID == 9) this.cardHeadings = ["Particular"];


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
    this.router.navigate(['subsection', {
      id: subject.id,
      name: subject.Name,
      parentID: subject.parentid,
      moduleid: subject.moduleid
    }]);
  }
  //receive data from child
  async receiveData(subject: any) {
    debugger
    if (subject.variant3 != undefined)
        subject['variant'] = subject.variant + "," + subject.variant3;
    else 
        subject['variant'] = subject.variant;
    try {
      const a =await this._apiService.updateModuleInfo("ModuleInfo", subject, this.URLdata)
      console.log("🚀 ~ file: section.component.ts:116 ~ SectionComponent ~ receiveData ~ a:", a)
      this.ngOnInit()
      this.getData()

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
