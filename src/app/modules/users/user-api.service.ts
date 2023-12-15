import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userModel } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  SERVER_URL= 'https://employee-port-server.onrender.com'
  constructor(private http:HttpClient) { }

  // add user api
  addUserAPI(user:userModel){
    return this.http.post(`${this.SERVER_URL}/users`,user)
  }

  // get all user 
  getAllUserAPI(){
    return this.http.get(`${this.SERVER_URL}/users`)
  }

  // delete user api
  deleteUserAPI(id:string){
    return this.http.delete(`${this.SERVER_URL}/users/${id}`)
  }

  // get a user detail
  viewUserAPI(id:any){
    return this.http.get(`${this.SERVER_URL}/users/${id}`)
  }

  // edit user api
  updateUserAPI(id:any,user:userModel){
    return this.http.put(`${this.SERVER_URL}/users/${id}`,user)
  }
}
