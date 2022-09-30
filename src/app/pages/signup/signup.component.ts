import { UserService } from 'src/app/services/user.service'
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2'; //Para las alertas  mas bonitas.

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public user = {
    username : '',
    password : '',
    nombre : '',
    apellido : '',
    email : '',
    telefono : ''
  }

  constructor(private userService:UserService, private snack:MatSnackBar) { }

  ngOnInit(): void {
  }

  formSubmit(){
    console.log(this.user);
    if(this.user.username == '' || this.user.username == null){
      this.snack.open('El nombre de usuario es requerido !!', 'Aceptar',{//aceptar es el boton que sale.. le puedes poner cualquier nombre
        duration:3000,
        verticalPosition : 'top',
        horizontalPosition : 'right'
      });
      return;
    }

    if(this.user.password == '' || this.user.password == null){
      this.snack.open('La contraseña es requerida !!', 'Aceptar',{//aceptar es el boton que sale.. le puedes poner cualquier nombre
        duration:3000,
        verticalPosition : 'top',
        horizontalPosition : 'right'
      });
      return;
    }

    if(this.user.nombre == '' || this.user.nombre == null){
      this.snack.open('El nombre es requerido !!', 'Aceptar',{//aceptar es el boton que sale.. le puedes poner cualquier nombre
        duration:3000,
        verticalPosition : 'top',
        horizontalPosition : 'right'
      });
      return;
    }

    if(this.user.apellido == '' || this.user.apellido == null){
      this.snack.open('El apellido es requerido !!', 'Aceptar',{//aceptar es el boton que sale.. le puedes poner cualquier nombre
        duration:3000,
        verticalPosition : 'top',
        horizontalPosition : 'right'
      });
      return;
    }

    if(this.user.email == '' || this.user.email == null){
      this.snack.open('El email es requerido !!', 'Aceptar',{//aceptar es el boton que sale.. le puedes poner cualquier nombre
        duration:3000,
        verticalPosition : 'top',
        horizontalPosition : 'right'
      });
      return;
    }

    if(this.user.telefono == '' || this.user.telefono == null){
      this.snack.open('El telefono es requerido !!', 'Aceptar',{//aceptar es el boton que sale.. le puedes poner cualquier nombre
        duration:3000,
        verticalPosition : 'top',
        horizontalPosition : 'right'
      });
      return;
    }

    this.userService.añadirUsuario(this.user).subscribe( //subscribe es el observable
      (data) => {
        console.log(data);
        Swal.fire('Usuario guardado','Usuario registrado con exito en el sistema','success');
      },(error) => {
        console.log(error);
        this.snack.open('Ha ocurrido un error en el sistema !!', 'Aceptar',{//aceptar es el boton que sale.. le puedes poner cualquier nombre
          duration:3000,
          verticalPosition : 'top',
        });
      }
    )
  }
}
