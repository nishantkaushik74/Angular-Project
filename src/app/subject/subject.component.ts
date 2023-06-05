import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SubjectModel } from '../../app/Model/Subject'
import { SubjectServiceService } from '.././Services/subject-service.service'
@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent  implements OnInit 
{
  userForm!:FormGroup;
  subjectData:any;
  SubjectModelObj:SubjectModel=new SubjectModel()
   details:any;
  


//   userform: FormGroup<Subjects> | undefined;
//   userForm = new FormGroup({
//     Id:new FormControl(),
//     subCode: new FormControl(),
//     subName: new FormControl()
// }); 
  
constructor(private formBuilder:FormBuilder,private _Service:SubjectServiceService){debugger;
  
//  this._Service.getAllSubject().subscribe({next:(sub)=>{
//   this.subject=sub;
//   console.log(sub);
//  },
// error:(Response)=>{
// console.log(Response);
// }
//   });
}
  ngOnInit(): void {
    this.userForm=this.formBuilder.group({
      Id:[''],
      subCode: [''],
      subName: ['']
    })
    this.getAllSubject();
  }

 postSubjectDetails(){
   this.SubjectModelObj.Id=0 ;
   this.SubjectModelObj.subName=this.userForm.value.subName;
   this.SubjectModelObj.subCode=this.userForm.value.subCode ;

   this._Service.postSubject(this.SubjectModelObj).subscribe({next:(res)=>{
    console.log(res);
    alert("Subject Added Successfully");
    this.getAllSubject();
    let ref=document.getElementById('cancel')
    ref?.click();
    this.userForm.reset();
   },
   error:(Response)=>{
    console.log(Response)
    alert("Something went wrong");
   }
  })
}

getAllSubject(){
  this._Service.getSubject().subscribe({next:(res)=>{
      this.subjectData=res;
      console.log(res);
     },
    error:(Response)=>{
    console.log(Response);
    }
  });
}
deleteSubject(details:any){
this._Service.deleteSubject(details.id).subscribe({next:(res)=>{
  console.log(res);
  alert("Something went wrong");
 this.getAllSubject();
 },
 error:(Response)=>{
  console.log(Response)
  alert("Subject Deleted  Successfully");
  
 }
})

}
 onEditRecord(details:any){
   this.userForm.controls['Id'].setValue(details.id);
   this.userForm.controls['subName'].setValue(details.subName);
   this.userForm.controls['subCode'].setValue(details.subCode);
 }
update(){
  this.SubjectModelObj.Id=this.userForm.value.Id ;
  this.SubjectModelObj.subName=this.userForm.value.subName;
  this.SubjectModelObj.subCode=this.userForm.value.subCode ;
  this._Service.updateSubject(this.SubjectModelObj,this.SubjectModelObj.Id).subscribe({next:(res)=>{
    console.log(res);
    alert("Subject update Successfully");
   
    // let ref=document.getElementById('cancel')
    // ref?.click();
    // this.userForm.reset();
   
  },
   error:(Response)=>{
    console.log(Response)
    alert("Something went wrong");
   }
  })
}
 
// }







  


}



