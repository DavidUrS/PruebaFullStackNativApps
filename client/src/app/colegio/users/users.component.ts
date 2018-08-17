import { Component, OnInit } from '@angular/core';
import { Users } from './../../models/users';
import { LoginService } from './../../services/login.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  modelUsers = new Users();

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  saveUsers(){
    const newUser:Users={
      user: this.modelUsers.user,
      password: this.modelUsers.password
    }
    this.loginService.postuser(newUser).subscribe(res=>{
      console.log(res);
    })
    this.modelUsers.user='';
    this.modelUsers.password='';
  }

}
