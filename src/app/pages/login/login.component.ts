import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    "username" : "",
    "password" : ""
  }

  constructor(private snack:MatSnackBar) { }

  ngOnInit(): void {
  }

  formSubmit(){
    if(this.loginData.username.trim() == null || this.loginData.username.trim() == ''){
      this.snack.open('El nombre de usuario es requerido!!' , 'Aceptar',{
        duration:3000
      })
      return;
    }

    if(this.loginData.password.trim() == null || this.loginData.password.trim() == ''){
      this.snack.open('La contraseña es requerida!!' , 'Aceptar',{
        duration:3000
      })
      return;
    }
  }

}
