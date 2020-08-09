import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { FormControl,FormGroup,FormBuilder, Validators} from '@angular/forms';
import { UserService } from '../../service/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  submitted = false;

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private userService:UserService
    ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(6)]]
    })
  }

  get f() { return this.loginForm.controls; }

  login(){
    this.submitted = true;
    if (this.loginForm.invalid) {
        return;
    }
    console.log(this.loginForm.value)
    this.userService.login(this.loginForm.value).subscribe(resp=>{
      let stringifiedData = JSON.stringify(resp);
      let parsedJson = JSON.parse(stringifiedData);
        if(parsedJson.success==true){
          console.log(parsedJson.data)
        }
    },(error:any)=>{
      console.log(error);
    });
  }

  

}
