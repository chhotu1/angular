import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { JWT_OPTIONS } from '@auth0/angular-jwt';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users:any[]=[];

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.userService.getAllUsers().subscribe((resp:any)=>{
      if(resp.success==true){
        this.users =resp.data;
        console.log(resp);
      }
    },(error:any)=>{
      console.log(error);
    })

  }

}
