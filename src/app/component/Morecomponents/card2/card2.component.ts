import { Component, Input ,EventEmitter,Output} from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-card2',
  templateUrl: './card2.component.html',
  styleUrls: ['./card2.component.scss']
})
export class Card2Component {
    //openAndClose 

  //Other variables declared
  @Input() data: any;
  @Output() receiveData = new EventEmitter<void>();
  data1={
    working:"working"
  }
  //Constructor

  //NGonIt Called function

  //ngOnIt
  ngOnInit() {
  }
  //receive data from child

  sendItem(data:any){
    console.log("🚀 ~ file: card2.component.ts:28 ~ Card2Component ~ sendItem ~ data:", data)
    this.receiveData.emit(data);
  }

}
