import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { log } from 'console';
import { SignUPService } from 'src/app/Services/sign-up.service';


@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent {

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
    h1: "Add Form",
    h2: "Subject of the the form you want to add ?",
    h3: "Form details",
    optional:"Name of the form?",
    date: false,
    form: true
  }
  endPoint: any;
  ModulesTable: any;
  CardData: any;
  Docdata: any
  heading = { h1: "Subject", h2: "Form Name" }
  //Constructorp
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

        const [Subject, FormName] = data.Name.split(',');
        data["Subject"] = FormName
        data["Name"] =  Subject


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
