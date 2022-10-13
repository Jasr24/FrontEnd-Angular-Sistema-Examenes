import { Router } from '@angular/router';
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

  constructor(private snack:MatSnackBar, private loginService:LoginService, private router:Router) { }

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
          this.loginService.setUser(user);
          console.log(user);

          if(this.loginService.getUserRole() == "ADMIN"){
            //Mostramos el Dashboard del administrador
            //window.location.href = '/admin'; //al maestro no le sirvio por que tenia que reiniciar el foron end.
            this.router.navigate(['admin']); //Este usa el maestro pero se debe dar dos veses click
            this.loginService.loginStatusSubjec.next(true);
          } else if (this.loginService.getUserRole() == "NORMAL"){
            //Mostramos el Dashboard del usuario
            //window.location.href = '/user-dashboard'; //al maestro no le sirvio por que tenia que reiniciar el foron end.
            this.router.navigate(['user-dashboard/0']); //Este usa el maestro pero se debe dar dos veses click
            this.loginService.loginStatusSubjec.next(true);
          } else {
            this.loginService.logout();
          }
        })
      },(error) => {
        console.log(error);
        this.snack.open('Detalles invalidos, Vuelva a intentarlo', 'Aceptar', {
          duration:3000
        }); //En caso de haber error.
      }
    )
  }

}
