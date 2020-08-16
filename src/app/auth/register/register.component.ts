import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup;
  submitted:boolean;


  constructor(private fb:FormBuilder,private userService:UserService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name:['',{validators: Validators.compose([Validators.required, Validators.min(3)]), updateOn: "blur"}],
      email:['',{validators: Validators.compose([Validators.required, Validators.email]), updateOn: "blur"}],
      password:['',{validators: Validators.compose([Validators.required, Validators.min(5)]), updateOn: "blur"}],
      role:'user'
    })
  }

  get fval() {
    return this.registerForm.controls;
  }

  register(){
    console.log(this.registerForm.value);
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
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
