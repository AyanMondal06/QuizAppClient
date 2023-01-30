import { Component } from '@angular/core';
import {  FormBuilder, FormGroup } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { VirtualTimeScheduler } from 'rxjs';
import { QuestionModel } from 'src/app/Models/Question';
import { CrudService } from 'src/app/Services/crud.service';

@Component({
  selector: 'app-admin-dashbord',
  templateUrl: './admin-dashbord.component.html',
  styleUrls: ['./admin-dashbord.component.css']
})
export class AdminDashbordComponent {
  constructor( 
    public crudService:CrudService,
    private toast:NgToastService,
    private fb: FormBuilder,
    ){}

  // addComponentVisible:boolean=false;
  // editComponentVisible:boolean=false;
  
  addForm!:FormGroup;
  editForm!:FormGroup;
  // data!:any;



  ngOnInit():void{
  // this.addForm=this.fb.group({
  //   questionId:0,
  //   questionInWords:"",
  //   imageName:"",
  //   option1:"",
  //   option2:"",
  //   option3:"",
  //   option4:"",
  //   answer:0,
  // });
  // this.editForm=this.fb.group({
  //   questionId:0,
  //   questionInWords:"",
  //   option1:"",
  //   option2:"",
  //   option3:"",
  //   option4:"",
  //   answer:0,
  // });

  this.crudService.refreshList()
  .subscribe({
    next:(data:any)=>{
      this.crudService.list=data;
    },
    error:()=>{
    }
  })
  }

  showPopupButton(){
    this.crudService.showPopup=true;
    
  }
  // editQuestionOnSubmit(id:number){
  //   if(this.editForm.valid){
  //     this.crudService.EditQuestion(id,this.editForm.value)
  //     .subscribe(
  //       (data:any)=>{
  //         this.resetForm(this.editForm);
  //         this.crudService.refreshList();
  //         this.toast.info({detail:'SUCCESS!' ,summary:"ADDED",duration:2000})
  //       }
  //     )
  //   }
  // }
  // populateEditForm(id:number){
  //   this.idFOrEdit=id;
  //   this.crudService.showAQuestion(id)
  //   .subscribe(
  //     (data:any)=>{
  //       this.data=data;
  //       this.editForm.value.questionId=data.questionId;
  //       this.editForm.value.questionInWords=data.questionInWords;
  //       this.editForm.value.option1=data.option1;
  //       this.editForm.value.option2=data.option2;
  //       this.editForm.value.option3=data.option3;
  //       this.editForm.value.option4=data.option4;
  //       this.editForm.value.answer=data.answer;
  //       console.log(this.editForm.value)
  //     }
  //   )
  // }
 
  callEditQuestion(id:number){
    
    this.crudService.idForEdit=id;
    this.showPopupButton();

    

  }

  callDeleteQuestion(id:number){
    console.log(id);
    this.crudService.deleteQuestion(id).subscribe();

  }
  // resetForm(form: FormGroup) {
  //   form.reset();
  // }

}
