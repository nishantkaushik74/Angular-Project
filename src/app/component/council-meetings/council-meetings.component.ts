import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { log } from 'console';
import { SignUPService } from 'src/app/Services/sign-up.service';

@Component({
  selector: 'app-council-meetings',
  templateUrl: './council-meetings.component.html',
  styleUrls: ['./council-meetings.component.scss']
})
export class CouncilMeetingsComponent {
  
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
  data = {
    Title: "Add council-meetings",
    h1:"Add date",
    h2: "Name the council-meetings you want to add ?",
    DataEnter: "Council-meetings details",
  }
  endPoint: any;
  ModulesTable: any;
  CardData: any;
  Docdata: any
  heading={h1:"Date",h2:"Meeting"}
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
    this.CardData = await this._apiService.getModuleInfoTableData("ModuleInfo", this.ModulesTable[0]?.id, null);
    this.CardData.map((data: any) => {
      const [Date, Meeting] = data.Name.split(',');
      data["h1"] = Date
      data["h2"] = Meeting

    })
  }
  //ngOnIt
  ngOnInit() {
    this.endPoint = this.route.snapshot.url.join('/').split("/")[0];
    this.getData()
  }
  //receive data from child
  receiveCardData(subject: any) {
    this.openViewer(subject)
  }

  async receiveData(subject: any) {

    subject["addedValue"] = subject.variant + "," + subject.variant3
    try {
      const a =await this._apiService.updateModuleInfoTable("ModuleInfo", subject, this.ModulesTable[0]?.id)
      this.getData()
      this.closeModal()
    }
    catch (error) { console.log(error) }
  }

}
