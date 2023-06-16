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



  //Other variables declared
  data = {
    h1: "Add council-meetings",
    h2: "Name the council-meetings you want to add ?",
    h3: "Council-meetings details",
    date: true,
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
      console.log("🚀 ~ file: council-meetings.component.ts:56 ~ CouncilMeetingsComponent ~ this.CardData.map ~ data:", data)

    })
  }
  //ngOnIt
  ngOnInit() {
    this.endPoint = this.route.snapshot.url.join('/').split("/")[1];
    this.getData()
  }
  //receive data from child
  receiveCardData(subject: any) {
    console.log("🚀 ~ file: council-meetings.component.ts:78 ~ CouncilMeetingsComponent ~ receiveCardData ~ subject:", subject)
    this.openDisplayDoc(subject.data)
  }

  receiveData(subject: any) {

    const variantText = subject.variant;
    const variant3Text = subject.variant3;
    subject["addedValue"] = variant3Text + "," + variantText
    try {
      const a = this._apiService.updateModuleInfoTable("ModuleInfo", subject, this.ModulesTable[0]?.id)
      this.getData()
      this.closeModal()
    }
    catch (error) { console.log(error) }
  }

}
