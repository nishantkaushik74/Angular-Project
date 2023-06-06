import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignUPService } from 'src/app/Services/sign-up.service';

@Component({
  selector: 'app-subject-section',
  templateUrl: './subject-section.component.html',
  styleUrls: ['./subject-section.component.scss']
})
export class SubjectSectionComponent {
  data:any;
  actName: any;
  actID:any
  isCardOpen = false;
  subject_section: any;
  headings = {
    heading1: "Subject-Section Names",
    heading2: "Name of the subject-section fo the act? "
  }
  constructor(
    private route: ActivatedRoute,
    private _apiService: SignUPService,
    private router: Router

  ) { }
  async ngOnInit() {
    const actId = this.route.snapshot.paramMap.get('id');
    const actname = this.route.snapshot.paramMap.get('name');
    this.actName = actname
    this.actID=actId;
    try {
      const subject = await this._apiService.getTableData("Act", actname,0,"a");
      this.data=subject
    } catch (error) {
    }
  }
  addSubjectSectionHandler() {
    this.isCardOpen = true;
  }
  hideChild(): void {
    this.isCardOpen = false;
  }
  async handleFormData(formData: any) {
    formData["actName"] = this.actName

    this.subject_section = formData
    try {
      const data = await this._apiService.insertData("Act", null, this.subject_section);
    } catch (error) { }
    this.hideChild()
    this.ngOnInit()
  }
  routeSubSelectSection(item:any){
  // console.log("🚀 ~ file: subject-section.component.ts:54 ~ SubjectSectionComponent ~ routeSubSelectSection ~ item:", item)

    this.router.navigate(['gst/act/subSelect',item.id,item.name_of_act,item.subject_section]);
  }
}
