import { Component } from '@angular/core';
import { log } from 'console';

@Component({
  selector: 'app-draft-reply',
  templateUrl: './draft-reply.component.html',
  styleUrls: ['./draft-reply.component.scss']
})
export class DraftReplyComponent {
  //openAndClose 
  isModalOpen = false
  openModal() {
    this.isModalOpen = true
  }
  closeModal() {
    this.isModalOpen = false
  }
  //Other variables declared
  data = {
    title: "subject",
    content: ""
  }
  //Constructor

  //NGonIt Called function

  //ngOnIt

  //receive data from child
  receiveData(subject: any) {    
    console.log("working");
    console.log("🚀 ~ file: draft-reply.component.ts:30 ~ DraftReplyComponent ~ receiveData ~ subject:", subject)
  }
}
