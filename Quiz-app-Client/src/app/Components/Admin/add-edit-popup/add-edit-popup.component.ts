import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { CrudService } from 'src/app/Services/crud.service';

@Component({
  selector: 'app-add-edit-popup',
  templateUrl: './add-edit-popup.component.html',
  styleUrls: ['./add-edit-popup.component.css']
})
export class AddEditPopupComponent {




  constructor(
    public crudService: CrudService,
    private toast: NgToastService,
    private fb: FormBuilder,
  ) { }
  addEditForm!: FormGroup;
  inputButton: string = 'ADD';


  ngOnInit(): void {
    this.addEditForm = this.fb.group({
      questionId: 0,
      questionInWords: "",
      imageName: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      answer: "",
    });
    if (this.crudService.idForEdit) {
      this.populateEditForm()
      this.inputButton = 'UPDATE'
      console.log(this.addEditForm.value)
    }
  }
  OnSubmit() {
    if (!this.crudService.idForEdit) {
      if (this.addEditForm.valid) {
        console.log(this.addEditForm.value)
        this.crudService.addQuestion(this.addEditForm.value)
          .subscribe(
            (data: any) => {
              this.addEditForm.reset();
              this.crudService.refreshList();
              this.crudService.showPopup = false;
              this.toast.info({ detail: 'SUCCESS!', summary: "ADDED", duration: 2000 })
            })
      }
    } else {
      if (this.addEditForm.valid) {
        console.log(this.addEditForm.value)
        this.crudService.EditQuestion(this.addEditForm.value.questionId, this.addEditForm.value)
          .subscribe(
            (data: any) => {
              this.addEditForm.reset();
              this.crudService.refreshList();
              this.crudService.showPopup = false;
              this.inputButton = 'ADD'
              this.toast.info({ detail: 'SUCCESS!', summary: "UPDATED", duration: 2000 })
            }
          )
      }
    }
  }
  populateEditForm() {

    this.crudService.showAQuestion(this.crudService.idForEdit)
      .subscribe(
        (data: any) => {
          this.crudService.dataForEdit = data;
          this.addEditForm.controls['questionId'].setValue(data.questionId);
          this.addEditForm.controls['questionInWords'].setValue(data.questionInWords);
          this.addEditForm.controls['option1'].setValue(data.option1);
          this.addEditForm.controls['option2'].setValue(data.option2);
          this.addEditForm.controls['option3'].setValue(data.option3);
          this.addEditForm.controls['option4'].setValue(data.option4);
          this.addEditForm.controls['answer'].setValue(data.answer);
        }
      )
  }
  closePopup() {
    this.crudService.showPopup = false;
    this.crudService.idForEdit = NaN;
  }
}
