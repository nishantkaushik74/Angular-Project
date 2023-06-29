import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { log } from 'console';
import { SignUPService } from 'src/app/Services/sign-up.service';

@Component({
  selector: 'app-case-laws',
  templateUrl: './case-laws.component.html',
  styleUrls: ['./case-laws.component.scss']
})
export class CaseLawsComponent {
  //openAndClose 
  //openAndClose 
  isModalOpen = false
  openModal() {
    this.isModalOpen = true
  }
  closeModal() {
    this.isModalOpen = false
  }
  isDocDisplayOpen = false;

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
    Title: "Enter Case Law",
    h1: "Date",
    h2: "Appellant",
    h3: "Respondent",
    h4: "Court Name",
    h5: "Section No.",
    h6: "Subject",
    h7: "Briefing",
    DataEnter: "Case law",

  }
  endPoint: any;
  ModulesTable: any;
  CardData: any;
  Docdata: any;
  heading = {
    h1: "Date :",
    h2: "Appellant :",
    h3: "Respondent :",
    h4: "Court Name :",
    h5: "Section No :",
    h6: "Subject :",
    h7: "Briefing :",
  }

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
      const [Date, Appellant, Respondent, CourtName, SectionNo, Subject, Briefing] = data.Name.split(',');
      data["h1"] = Date
      data["h2"] = Appellant
      data["h3"] = Respondent
      data["h4"] = CourtName
      data["h5"] = SectionNo
      data["h6"] = Subject
      data["h7"] = Briefing

    })
    console.log("🚀 ~ file: case-laws.co", this.CardData)
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

    subject["addedValue"] = subject.variant + "," + subject.variant3 + "," + subject.variant4 + "," + subject.variant5 + "," + subject.variant6 + "," + subject.variant7 + "," + subject.variant8
    const a =await this._apiService.updateModuleInfoTable("ModuleInfo", subject, this.ModulesTable[0]?.id)
    this.getData()
    this.closeModal()

  }
}
