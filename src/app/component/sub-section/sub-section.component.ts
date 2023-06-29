import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignUPService } from 'src/app/Services/sign-up.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sub-section',
  templateUrl: './sub-section.component.html',
  styleUrls: ['./sub-section.component.scss']
})
export class SubSectionComponent {
  //openAndClose
  isModalOpen = false;
  openModal() { this.isModalOpen = true }
  closeModal() { this.isModalOpen = false }

  isDocDisplayOpen = false;
  openDisplayDoc(data: any) {
    console.log("🚀 ~ file: section.component.ts:17 ~ SectionComponent ~ openDisplayDoc ~ data:", data)
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

  //Other variables declared
  cardHeadings= ["Subject:","Section:"]

  URLdata: any;
  ModuleInfoTable: any;
  dataToSend = 1;
  data = {
    Title: "Add Sub Section",
    h1: "Name the Sub Section you want to add ?",
    h2:["Add Section","Add Subject"],
    DataEnter: "Sub Section details",
    identity:"sub-section"
  }

  Docdata: any


  //Constructor
  constructor(
    private route: ActivatedRoute,
    private _apiService: SignUPService,
    private router: Router,
    private location: Location) { }
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
  async receiveData(subject: any) {
    subject['variant'] = subject.variant + "," + subject.variant3;
    console.log("🚀 ~ file: sub-section.component.ts:81 ~ SubSectionComponent ~ receiveData ~ subject:", subject)
    try {
      const a = await this._apiService.updateModuleInfo("ModuleInfo", subject, this.URLdata)
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
