import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, pipe, Subject } from 'rxjs';
// import { Subjects } from '../Model/Subject';
import { SubjectModel } from '../Model/Subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectServiceService {

  constructor(private http:HttpClient) { }
  
  baseUrl : string = "https://localhost:7049/";


  postSubject(data:any){
    return this.http.post(this.baseUrl + 'api/Subject/SaveSubject',data)
    .pipe(map((res:any)=>{
      return res;
    }));
  }
  getSubject():Observable<SubjectModel[]>{
    
    return this.http.get<SubjectModel[]>(this.baseUrl+'api/Subject/GetAllSubject')
    .pipe(map((res:any)=>{
      return res;
    }));
  }
  updateSubject(data:any,Id:number){
    var _data={"Id":Id,"subName":data.subName,"subCode":data.subCode};
    return this.http.put(this.baseUrl+'api/Subject/UpdateSubject',_data)
    .pipe(map((res:any)=>{
      return res;
    }));
  }
  deleteSubject(Id:number){
    return this.http.delete(this.baseUrl+`api/Subject/DeleteSubject/${Id}`)
    .pipe(map((res:any)=>{
      return res;
    }));
    
  }


  
  


}