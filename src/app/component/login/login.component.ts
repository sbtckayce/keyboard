import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_sevices/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm !:FormGroup
  formData = new FormGroup({
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',Validators.required)
  })
  constructor(private auth : AuthService, private router : Router) { }

  ngOnInit(): void {
  }
  onSignIn(){
    const {email, password} = this.formData.value
    this.auth.login(email, password)
    .then((data)=>{
      console.log('data signIn',data)
      this.router.navigate([''])
    })
  }
}
