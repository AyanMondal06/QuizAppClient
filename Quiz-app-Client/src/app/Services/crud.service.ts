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
  formData: QuestionModel={
    questionId:0,
    questionInWords:"",
    option1:"",
    option2:"",
    option3:"",
    option4:"",
    answer:0,
  };

  list:QuestionModel[]=[];
 
  constructor(private http: HttpClient,private route: Router) { }
  addQuestion(){
    return this.http.post(this.rootUrl+'/Question/',this.formData);
  }
  deleteQuestion(id:number){
    return this.http.delete(this.rootUrl+'/Question/'+id);
  }
  EditQuestion(){
    return this.http.put(this.rootUrl+'/Question/'+this.formData.questionId,this.formData)
  }
  // showAQuestion(id:number){
  //   return this.http.get(this.rootUrl+'/Question/',id)
  // }
  refreshList(){
    return this.http.get(this.rootUrl+'/Question/GetAll');
  }
}
