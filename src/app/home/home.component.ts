import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../modules/users/user-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  admin_name:string=""
  employee_count:number=0
  showSideBar:boolean=true
  selected: Date | null = new Date()

  constructor(private api:UserApiService,private router:Router){}
  ngOnInit(): void {
    if(localStorage.getItem("admin_name")){
      this.admin_name=localStorage.getItem('admin_name') || ""
    }
    this.getTotalEmployee()
  }

  menuBtnClick(){
    this.showSideBar = !this.showSideBar
  }

  getTotalEmployee(){
    this.api.getAllUserAPI().subscribe((res:any)=>{
      this.employee_count= res.length
      console.log(res);
      
    })
  }
  logout(){
    localStorage.removeItem("admin_name")
    localStorage.removeItem("admin_password")
    this.router.navigateByUrl('')
  }

  getUpdatedAdmin(event:any){
    this.admin_name=event
  }
}
