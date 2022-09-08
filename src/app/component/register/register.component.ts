import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_sevices/auth.service';
export class MatchValidator {
  
  static validate(group: AbstractControl): ValidationErrors | null { 
  

    
  const {password , passwordConfirm} = group.value
  return password === passwordConfirm ? null : {notSame : true}
  };

}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  formData = new FormGroup({
    name:new FormControl('',[Validators.required]),
    email : new FormControl('',[Validators.required]),
    password : new FormControl('',[Validators.required]),
    passwordConfirm : new FormControl('',[Validators.required])
  },
  {validators : [MatchValidator.validate]}
  )


  constructor(private auth: AuthService,private router: Router) { }

  ngOnInit(): void {
  }
  register() {
   
    const {email,password} = this.formData.value

    this.auth.register(email, password)
    .then((data) => {
      console.log('data signOut',data)
      this.router.navigate(['/login'])
    })

  }
}
