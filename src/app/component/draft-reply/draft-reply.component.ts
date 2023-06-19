import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { log } from 'console';
import { SignUPService } from 'src/app/Services/sign-up.service';

@Component({
  selector: 'app-draft-reply',
  templateUrl: './draft-reply.component.html',
  styleUrls: ['./draft-reply.component.scss']
})
export class DraftReplyComponent {
  //openAndClose 
  isDocDisplayOpen = false;
  isModalOpen = false
  openModal() {
    this.isModalOpen = true
  }
  closeModal() {
    this.isModalOpen = false
  }
  closeDisplayDoc() {
    this.isDocDisplayOpen = false
  }
  openDisplayDoc(data: any) {
    this.isDocDisplayOpen = true
    this.Docdata = data;
    console.log(data);
    
  }
  //Other variables declared
  data = {
    h1: "Add Draft",
    h2: "Name the Draft you want to add ?",
    h3: "Draft details",
  }
  endPoint: any;
  ModulesTable: any;
  CardData: any;
  Docdata:any
  heading={h2:"Subject"}
  //Constructor
  constructor(
    private _apiService: SignUPService,
    private router: Router,
    private route: ActivatedRoute,
  ) {

  }
  //NGonIt Called function
  async getData() {
    this.ModulesTable = await this._apiService.getTableDataOnEndPoint("Modules", this.endPoint)
    this.CardData = await this._apiService.getModuleInfoTableData("ModuleInfo", this.ModulesTable[0]?.id, null)
    this.CardData.map((data: any) => {
      if (data.data == null || data.data == "null" || data.data == undefined) {
        data["icon"] = false; data["date"] = false
        return data
      }
      else data["icon"] = true; data["date"] = false

    })
  }
  //ngOnIt
  ngOnInit() {
    this.endPoint = this.route.snapshot.url.join('/').split("/")[1];
    this.getData()
  }
  //receive data from child
  receiveCardData(subject: any) {
    this.openDisplayDoc(subject.data)
  }

  receiveData(subject: any) {
    subject["addedValue"] =subject.variant
    try {
      const a = this._apiService.updateModuleInfoTable("ModuleInfo", subject, this.ModulesTable[0]?.id)
      this.getData()
      this.closeModal()
    }
    catch (error) { console.log(error) }
  }

}
