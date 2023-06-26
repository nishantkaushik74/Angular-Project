import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SignUPService } from 'src/app/Services/sign-up.service';

import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-datemodal',
  templateUrl: './datemodal.component.html',
  styleUrls: ['./datemodal.component.scss']
})
export class DatemodalComponent {
  //Other variables declared
  endPoint: any;
  ModulesTable: any;
  CardData: any

  @Input() receivedData: any;
  @Input() data: any;


  //openAndClose 
  @Output() closeModal = new EventEmitter<void>();
  from: any;
  closeBox() {
    this.closeModal.emit();
  }
  @Output() receiveData = new EventEmitter<void>();

  //Constructor
  constructor(
    private _apiService: SignUPService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  //ngOnIt
  ngOnInit() {
    this.endPoint = this.route.snapshot.url.join('/').split("/")[0];
    this.getData()

  }
  //ngOnIt Called function
  async getData() {
    this.ModulesTable = await this._apiService.getTableDataOnEndPoint("Modules", this.endPoint)
    this.CardData = await this._apiService.getModuleInfoTableDataa("ModuleInfo", this.ModulesTable[0]?.id, this.data.currentDate.formattedDate)
    this.CardData.map((data: any) => {
      const [Content, Remark] = data.data.split(',');
      data["Content"] = Content
      data["Remark"] = Remark

    })
  }

  //other Function
  onsubmit(form: NgForm) {
    form.value["date"] = this.data.currentDate.formattedDate;
    form.value["variant2"] = form.value.remark + "," + form.value.content
    try {
      const a = this._apiService.updatetableee("ModuleInfo", form.value, this.ModulesTable[0]?.id)

    } catch (error) {

    }
    this.ngOnInit()
    this.getData()
    this.closeBox()
  }

}
