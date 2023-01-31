import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { CrudService } from 'src/app/Services/crud.service';

@Component({
  selector: 'app-admin-dashbord',
  templateUrl: './admin-dashbord.component.html',
  styleUrls: ['./admin-dashbord.component.css']
})
export class AdminDashbordComponent {
  constructor(
    public crudService: CrudService,
    private toast: NgToastService,
    private fb: FormBuilder,
  ) { }

  addForm!: FormGroup;
  editForm!: FormGroup;


  ngOnInit(): void {
    this.crudService.refreshList()
      .subscribe({
        next: (data: any) => {
          this.crudService.list = data;
        },
        error: () => {
        }
      })
  }
  showPopupButton() {
    this.crudService.showPopup = true;
  }

  callEditQuestion(id: number) {
    this.crudService.idForEdit = id;
    this.showPopupButton();
  }
  callDeleteQuestion(id: number) {
    console.log(id);
    this.crudService.deleteQuestion(id).subscribe();
    this.toast.success({detail:'Success',summary:"DELETED",duration:2000})
  }

}
