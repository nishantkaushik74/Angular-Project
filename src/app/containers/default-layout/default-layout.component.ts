import { Component } from '@angular/core';
import { SignUPService } from 'src/app/Services/sign-up.service';

import { navItems } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']

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
        // this.j = { name: this.modules[i].description, url: `gst/${this.modules[i].description.toLowerCase()}` }
        this.j = { name: this.modules[i].name, url: `${this.modules[i].description.toLowerCase().replace(/\s+/g, '')}`, id: this.modules[i].id }

        this.Navbar.push(this.j)
      }
      this.Navbar.sort((a:any, b:any) => a.id - b.id);

      this.navItems[3].children = [...this.Navbar]
    } catch (error) {
      console.log('Error:', error);
    }

  }


  handleItemClick(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    // Add your custom logic here for handling the item click
    // This code will prevent the sidebar from shrinking on item click
  }

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };


}
