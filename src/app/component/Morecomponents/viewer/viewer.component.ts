import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent {
  @Input() Docdata: any;
  url: any;
  pdfUrl: any
  otherUrl: any
  @Output() closeViewer = new EventEmitter<void>();

  constructor(private router: Router) { }

  ngOnInit() {
    this.url = this.Docdata.replace(/ /g, "%20");
    if (this.url.endsWith(".pdf")) {
      this.pdfUrl = this.url;
      console.log("PDF URL:", this.pdfUrl);
    } else {
      this.otherUrl = this.url;
      console.log("Other URL:", this.otherUrl);
    }

    console.log("🚀 ~ file: viewer.component.ts:12 ~ ViewerComponent ~ replacedStr:", this.url);
  }

  closeBox() {
    this.closeViewer.emit();
  }

  downloadFile() {
    const fileUrl = this.url // Replace with your file URL

    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = fileUrl;

    // Set the necessary attributes for downloading the file
    link.target = '_blank';
    link.download = 'filename.pdf'; // You can specify the desired filename here

    // Trigger the download
    link.click();
  }

}
