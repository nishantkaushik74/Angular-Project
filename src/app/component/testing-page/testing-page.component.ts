import { Component } from '@angular/core';

@Component({
  selector: 'app-testing-page',
  templateUrl: './testing-page.component.html',
  styleUrls: ['./testing-page.component.scss']
})
export class TestingPageComponent {

  selectedFile: any;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onsubmit(data: any) {
    if (this.selectedFile) {
      const formData: FormData = new FormData();

      formData.append('pdf', this.selectedFile, this.selectedFile.name);
      console.log("🚀 ~ file",  this.selectedFile)

      // You can now send the formData to your server for further processing.
      // For example, you can make an HTTP request using Angular's HttpClient module.

      // Replace the following code with your actual HTTP request
      // this.http.post('your-upload-url', formData).subscribe(
      //   response => {
      //   },
      //   error => {
      //     console.error('Upload error:', error);
      //   }
      // );

      // Reset the selected file
      this.selectedFile = undefined;
    }
  }

}
