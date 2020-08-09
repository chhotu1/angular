import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup;


  constructor(private fb:FormBuilder,private userService:UserService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name:[''],
      email:[''],
      password:[''],
      role:'Student'
    })
  }

  register(){
    console.log(this.registerForm.value);
    this.userService.createUser(this.registerForm.value).subscribe((resp:any)=>{
      console.log(resp)
      if(resp.success == true){
        console.log(resp)
      }
    },(error:any)=>{
      console.log(error)

    });

  }

}
