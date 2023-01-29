import { Component } from '@angular/core';
import { CrudService } from 'src/app/Services/crud.service';

@Component({
  selector: 'app-admin-dashbord',
  templateUrl: './admin-dashbord.component.html',
  styleUrls: ['./admin-dashbord.component.css']
})
export class AdminDashbordComponent {
  constructor( public crudService:CrudService){}
  ngOnInit(){
  this.crudService.refreshList()
  .subscribe({
    next:(data:any)=>{
      this.crudService.list=data;
    },
    error:()=>{
    }
  })
  }

}
