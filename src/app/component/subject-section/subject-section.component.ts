import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SignUPService } from 'src/app/Services/sign-up.service';

@Component({
  selector: 'app-subject-section',
  templateUrl: './subject-section.component.html',
  styleUrls: ['./subject-section.component.scss']
})
export class SubjectSectionComponent {
  data:any;
  actName: any;
  isCardOpen = false;
  subject_section: any;
  headings = {
    heading1: "Subject-Section Names",
    heading2: "Name of the subject-section fo the act? "
  }
  constructor(
    private route: ActivatedRoute,
    private _apiService: SignUPService
  ) { }
  async ngOnInit() {
    const actId = this.route.snapshot.paramMap.get('id');
    const actname = this.route.snapshot.paramMap.get('name');
    this.actName = actname
    try {
      const subject = await this._apiService.getTableData("Act", actname);
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
}
