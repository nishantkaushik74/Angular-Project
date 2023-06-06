import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignUPService } from 'src/app/Services/sign-up.service';

@Component({
  selector: 'app-select-subsection',
  templateUrl: './select-subsection.component.html',
  styleUrls: ['./select-subsection.component.scss']
})
export class SelectSubsectionComponent {
  isCardOpen = false
  isNameField = false
  actName: any;
  actID: any;
  subject_Section_Name: any
  data: any;
  formToggle: number = 0;
  headings = {
    heading1: "Sub-section Names",
    heading2: "Name of the Sub-section fo the select section? "
  }
  items: any;
  Sub_subject_section: any;
  constructor(
    private route: ActivatedRoute,
    private _apiService: SignUPService,
    private router: Router
  ) { }
  async ngOnInit() {
    const actId = this.route.snapshot.paramMap.get('id');
    const actname = this.route.snapshot.paramMap.get('name');
    const subject_section_name = this.route.snapshot.paramMap.get('name2');
    this.subject_Section_Name = subject_section_name
    this.actName = actname
    this.actID = actId;
    try {
      const subject = await this._apiService.getTableData("Act", actname, 2, subject_section_name);
      this.data = subject

    } catch (error) {
    }
  }
  edit_Add_view_toggle(num: number, item: any) {
    this.isCardOpen = true;
    this.formToggle = num
    this.items = item
  }
  hideChild(): void {
    this.isCardOpen = false;
    this.isNameField = false

  }

  async handleFormData(formData: any) {
    formData["name_of_act"] = this.actName
    formData["subject_Section_Name"] = this.subject_Section_Name

    formData["parent_id"] = 2

    this.Sub_subject_section = formData
    try {
      const data = await this._apiService.insertData("Act", null, this.Sub_subject_section);
    } catch (error) { }
    this.hideChild()
    this.ngOnInit()
  }
  addSubjectSection() {
    this.isNameField = true
  }
}
