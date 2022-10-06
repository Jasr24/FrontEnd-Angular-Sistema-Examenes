import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../services/login.service';

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

  constructor(private snack:MatSnackBar, private loginService:LoginService) { }

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

    //Para que esto funcione se debe agragar en el backend la anotacion @CrossOrigin("*"). con esta anotacion permite el intercambio de recursos entre el backend y el front end.
    this.loginService.generateToken(this.loginData).subscribe(
      (data:any) => {
        console.log(data);

        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe((user:any) => {
          console.log(user);
        })
      },(error) => {
        console.log(error);
      }
    )
  }

}
