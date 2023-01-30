import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { QuestionModel } from '../Models/Question';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  readonly rootUrl=environment.rootUrl;

  idForEdit:number=NaN;
  dataForEdit!:any;
  list:QuestionModel[]=[];
  showPopup:boolean=false;
 
  constructor(private http:HttpClient,private route: Router) { }
  addQuestion(body:any){
    return this.http.post(this.rootUrl+'/Question/AddQuestion/',body);
  }
  deleteQuestion(id:number){
    return this.http.delete(this.rootUrl+'/Question/delete?id='+id);
  }
  EditQuestion(id:number, body:any){
    return this.http.put(this.rootUrl+'/Question/editQuestion?id='+id,body);
  }
  showAQuestion(id:number){
    return this.http.get(this.rootUrl+'/Question/getAQuestion?id='+id);
  }
  refreshList(){
    return this.http.get(this.rootUrl+'/Question/GetAll');
  }
}
//http://localhost:5293/api/Question/getAQuestion?id=6