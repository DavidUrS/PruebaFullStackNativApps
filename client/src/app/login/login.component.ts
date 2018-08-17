import { Component, OnInit } from '@angular/core';
import { Users } from './../models/users';
import { LoginService } from './../services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  modelUsers = new Users();

  constructor(private loginService: LoginService, private router:Router) { }

  ngOnInit() {
  }

  loginUsers(){
    const newUserToLogin : Users={
      user: this.modelUsers.user,
      password: this.modelUsers.password
    }
    this.loginService.loginUser(newUserToLogin).subscribe(res=>{
      if(res=='Acceso concedido'){
        this.router.navigate(['courses']);
      }
      console.log(res);
    })
    this.modelUsers.user= '';
    this.modelUsers.password= '';
  }

}
