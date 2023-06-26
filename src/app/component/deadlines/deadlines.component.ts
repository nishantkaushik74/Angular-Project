import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SignUPService } from 'src/app/Services/sign-up.service';

import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-deadlines',
  templateUrl: './deadlines.component.html',
  styleUrls: ['./deadlines.component.scss']
})
export class DeadlinesComponent {
  //openAndClose 
  isModalOpen = false
  openModal() {
    this.isModalOpen = true
  }
  closeModal() {
    this.isModalOpen = false
    this.ngOnInit() 
    this.getData()

  }

  //Other variables declared
  data = {
    Title: "Add Due Date",
    h1: "Selected date  ",
    h2: "Add the Content",
    h3: "Add remark",
    currentDate:{}

  }
  endPoint:any
  currentDate: any
  CardData: any
  ModulesTable: any
  currentMonth: Date;
  daysOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  calendarCells: number[] = [];

  constructor(private _apiService: SignUPService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.currentMonth = new Date();
    this.generateCalendarCells();
  }

  previousMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, 1);
    this.generateCalendarCells();
  }
  async getData() {
    this.ModulesTable = await this._apiService.getTableDataOnEndPoint("Modules", this.endPoint)
    this.CardData = await this._apiService.getModuleInfoTableData("ModuleInfo", this.ModulesTable[0]?.id, null)
    console.log("🚀 ~ file: deadlines.component.ts:53 ~ DeadlinesComponent ~ getData ~ this.CardData:", this.CardData)
  }

  nextMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1);
    this.generateCalendarCells();
  }

  generateCalendarCells() {
    this.calendarCells = [];
    const startOfMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), 1);
    const endOfMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 0);
    const numDays = endOfMonth.getDate();

    // Fill in cells for days of the month
    for (let i = 1; i <= numDays; i++) {
      this.calendarCells.push(i);
    }

    // Fill in leading empty cells
    const firstDayOfWeek = startOfMonth.getDay();
    for (let i = 0; i < firstDayOfWeek; i++) {
      this.calendarCells.unshift(0);
    }
  }
  //Constructor

  //NGonIt Called function
  ngOnInit() {
    this.endPoint = this.route.snapshot.url.join('/').split("/")[0];
    this.getData()

  }
  //ngOnIt

  //receive data from child
  handleDateClick(date: number) {
    const selectedDate = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), date);
    const formattedDate = selectedDate.toDateString();

    this.data.currentDate = { formattedDate };
    this.openModal()
  }
  formatDate(date: number): string {
    const selectedDate = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), date);
    return selectedDate.toDateString();
  }
  getCellClass(cell: number): string {
    const hasMatchingDate = this.CardData.some((obj: any) => obj.Name === this.formatDate(cell));
    return hasMatchingDate ? 'glow' : '';
  }

}
