import { Component } from '@angular/core';
import { SignUPService } from 'src/app/Services/sign-up.service';

import { navItems } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {
  modules: any;
  j: any;
  Navbar: any = [];
  public navItems = navItems;

  constructor(
    private _apiService: SignUPService
  ) { }
  ngOnInit() {
    this.getTableData()
  }
  async getTableData() {
    try {
      this.modules = await this._apiService.getTableData('Modules');
      for (let i = 0; i < this.modules.length; i++) {
        this.j = { name: this.modules[i].description, url: `gst/${this.modules[i].description.toLowerCase()}` }
        this.Navbar.push(this.j)
      }
      this.navItems[3].children=[...this.Navbar]
    } catch (error) {
      console.log('Error:', error);
    }
  }



  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };


}
