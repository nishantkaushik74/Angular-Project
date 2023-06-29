import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { log } from 'console';
import { SignUPService } from 'src/app/Services/sign-up.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  //openAndClose 
  isModalOpen = false
  openModal() {
    this.isModalOpen = true
  }
  closeModal() {
    this.isModalOpen = false
  }

  // isDocDisplayOpen = false;
  // openDisplayDoc(data: any) {
  //   this.isDocDisplayOpen = true
  //   this.Docdata = data;
  // }
  // closeDisplayDoc() {
  //   this.isDocDisplayOpen = false
  // }

  isViewerOpen = false
  openViewer(data: any) {
    console.log("🚀 ~ file: notif", data)
    this.isViewerOpen = true
    this.Docdata = data;
  }
  closeViewer() {
    this.isViewerOpen = false
  }

  //Other variables declared
  data = {
    Title: "Enter Case Law",
    h1: "Date of issue",
    h2: "Government S.No",
    h4: "Subject",
    h5: "Briefing",
    h7: "Types",
    DataEnter: "Notification Details",

  }
  endPoint: any;
  ModulesTable: any;
  CardData: any;
  Docdata: any;
  heading = {
    h1: "Date of issue :",
    h2: "Government S.No :",
    h3: "Subject :",
    h5: "Briefing :",
    h6: "Types :",
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
      const [Date, Government, Subject, Briefing, Types] = data.Name.split(',');
      data["h1"] = Date
      data["h2"] = Government
      data["h3"] = Subject
      data["h5"] = Briefing
      data["h6"] = Types


    })
    console.log("🚀 ~ file: this.CardData.map ~ this.CardData:", this.CardData)
  }
  //ngOnIt
  ngOnInit() {
    this.endPoint = this.route.snapshot.url.join('/').split("/")[0];
    this.getData()

  }
  //receive data from child
  receiveCardData(subject: any) {
    // this.openDisplayDoc(subject.data)
    this.openViewer(subject.URL)
  }

  receiveData(subject: any) {

    subject["addedValue"] = subject.variant + "," + subject.variant3 + "," + subject.variant5 + "," + subject.variant6 + "," + subject.variant8
    const a = this._apiService.updateModuleInfoTable("ModuleInfo", subject, this.ModulesTable[0]?.id)
    this.getData()
    this.closeModal()
  }

}
