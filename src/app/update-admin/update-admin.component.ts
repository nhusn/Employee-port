import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserApiService } from '../modules/users/user-api.service';
import { AdminApiService } from '../services/admin-api.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.css']
})
export class UpdateAdminComponent implements OnInit{

  adminDetails:any={}
  editAdminStatus:boolean=false
  profileImages:string='./assets/images/219988.png'

  @Output() onAdminChange = new EventEmitter()

  constructor(private api:AdminApiService, private toaster:ToasterService){}
  ngOnInit(): void {
    
    this.api.authenticate().subscribe((res:any)=>{
      this.adminDetails=res
      if(res.picture){
        this.profileImages=res.picture
      }
    })
  }

  editAdminBtnClicked(){
    this.editAdminStatus=true
  }

  getFile(event:any){
    let file = event.target.files[0]
    let fr = new FileReader()
    fr.readAsDataURL(file)
    fr.onload=(event:any)=>{
      console.log(event);
      this.profileImages=event.target.result
      this.adminDetails.picture=event.target.result
      
    }
  }
  updateAdmin(){
    this.api.updateAdmin(this.adminDetails).subscribe({
      next:(res:any)=>{
        this.toaster.showSuccess("Admin details succesfully!!!")
        localStorage.setItem("admin_name",res.name)
        localStorage.setItem("admin_password",res.password)
        this.onAdminChange.emit(res.name)
        this.editAdminStatus=false
      },
      error:(err)=>{
        this.toaster.showError('Updation Failed!! Please try after some time')
      }
    })
  }
  cancel(){
    this.editAdminStatus=false
  }
}
