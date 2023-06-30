import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { log } from 'console';
import { SignUPService } from 'src/app/Services/sign-up.service';
@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent {

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
    Title: "Add articles",
    h1: "Add Date",
    h2: "Name the articles you want to add ?",
    DataEnter: "Articles details",
    date: true,
  }
  endPoint: any;
  ModulesTable: any;
  CardData: any;
  Docdata: any;
  heading = { h1: "Date", h2: "Subject" }

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
        data["icon"] = false; data["date"] = false;
        return data
      }
      else {
        data["icon"] = true;
        data["date"] = true
        const [date, Name] = data.Name.split(',');
        data["samay"] = date
        data["Name"] = Name
      }

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

    subject["addedValue"] = subject.variant3 + "," + subject.variant;
    console.log("🚀 ~ file: articles.component.ts:86 ~ ArticlesComponent ~ receiveData ~ subject:", subject)
    try {
      const a = await this._apiService.updateModuleInfoTable("ModuleInfo", subject, this.ModulesTable[0]?.id)
      this.getData()
      this.closeModal()
    }
    catch (error) { console.log(error) }
  }
}
